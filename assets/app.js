/* Raac booking app — map, geocoding, routing, fares, submit. No frameworks. */
(function () {
  "use strict";

  const API = "https://masul-forms-backend.vercel.app/api/submit";
  const SITE_ID = "raac";
  const MOGADISHU = [2.0469, 45.3182];
  const t = (k) => window.RaacI18n.t(k);

  const VEHICLES = [
    { id: "Bajaaj",   icon: "🛺", nameKey: "svc.bajaaj",   descKey: "svc.bajaajd",   base: 0.5, perKm: 0.3, perMin: 0.03, min: 1.0 },
    { id: "Caadi",    icon: "🚗", nameKey: "svc.caadi",    descKey: "svc.caadid",    base: 1.0, perKm: 0.5, perMin: 0.05, min: 2.0 },
    { id: "XL",       icon: "🚐", nameKey: "svc.xl",       descKey: "svc.xld",       base: 1.5, perKm: 0.7, perMin: 0.07, min: 3.0 },
    { id: "Delivery", icon: "📦", nameKey: "svc.delivery", descKey: "svc.deliveryd", base: 1.0, perKm: 0.4, perMin: 0.03, min: 1.5 },
  ];

  const state = {
    step: 1,
    pickup: null,   // {label, lat, lng}
    dropoff: null,
    route: null,    // {distanceKm, durationMin, approx}
    vehicle: "Caadi",
    when: "now",
    pinMode: null,  // "pickup" | "dropoff" | null
    submitting: false,
    lastRef: null,
  };

  const $ = (id) => document.getElementById(id);

  /* ---------- Map ---------- */
  const map = L.map("map", { zoomControl: false }).setView(MOGADISHU, 13);
  L.control.zoom({ position: "topright" }).addTo(map);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const mkIcon = (color, letter) =>
    L.divIcon({
      className: "",
      iconSize: [34, 42],
      iconAnchor: [17, 42],
      html:
        `<svg class="pin-a" width="34" height="42" viewBox="0 0 34 42"><path d="M17 1C9 1 2.5 7.5 2.5 15.5 2.5 26 14 39 17 41c3-2 14.5-15 14.5-25.5C31.5 7.5 25 1 17 1z" fill="${color}"/>` +
        `<text x="17" y="21" text-anchor="middle" font-family="system-ui" font-weight="700" font-size="14" fill="#ffffff">${letter}</text></svg>`,
    });
  const ICON_A = mkIcon("#9B1C2E", "A");
  const ICON_B = mkIcon("#34d399", "B");

  let markerA = null, markerB = null, routeLine = null;

  function setPoint(kind, pt) {
    state[kind] = pt;
    state.route = null;
    const input = $(kind === "pickup" ? "pickup" : "dropoff");
    input.value = pt ? pt.label : "";
    clearFieldError(kind === "pickup" ? "pickup" : "dropoff");
    if (kind === "pickup") {
      if (markerA) markerA.remove(), (markerA = null);
      if (pt) markerA = L.marker([pt.lat, pt.lng], { icon: ICON_A }).addTo(map);
    } else {
      if (markerB) markerB.remove(), (markerB = null);
      if (pt) markerB = L.marker([pt.lat, pt.lng], { icon: ICON_B }).addTo(map);
    }
    if (routeLine) routeLine.remove(), (routeLine = null);
    if (state.pickup && state.dropoff) {
      map.fitBounds(L.latLngBounds([state.pickup.lat, state.pickup.lng], [state.dropoff.lat, state.dropoff.lng]).pad(0.25));
      fetchRoute();
    } else if (pt) {
      map.setView([pt.lat, pt.lng], 15);
    }
  }

  /* ---------- Pin-on-map mode ---------- */
  function setPinMode(mode) {
    state.pinMode = state.pinMode === mode ? null : mode;
    $("pinPickupBtn").classList.toggle("active", state.pinMode === "pickup");
    $("pinDropBtn").classList.toggle("active", state.pinMode === "dropoff");
    const hint = $("mapHint");
    if (state.pinMode) {
      hint.textContent = t(state.pinMode === "pickup" ? "app.hintPickup" : "app.hintDrop");
      hint.classList.add("show");
    } else {
      hint.classList.remove("show");
    }
  }
  $("pinPickupBtn").addEventListener("click", () => setPinMode("pickup"));
  $("pinDropBtn").addEventListener("click", () => setPinMode("dropoff"));

  map.on("click", (e) => {
    if (!state.pinMode) return;
    const kind = state.pinMode;
    const { lat, lng } = e.latlng;
    setPinMode(null);
    setPoint(kind, { label: `${lat.toFixed(5)}, ${lng.toFixed(5)}`, lat, lng });
    reverseGeocode(lat, lng).then((label) => {
      if (label && state[kind] && state[kind].lat === lat) {
        state[kind].label = label;
        $(kind === "pickup" ? "pickup" : "dropoff").value = label;
      }
    });
  });

  /* ---------- Geolocation (Capacitor plugin in the native apps, browser API on web) ---------- */
  function getPosition() {
    const geo = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Geolocation;
    const opts = { enableHighAccuracy: true, timeout: 8000 };
    if (geo) return geo.getCurrentPosition(opts);
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject(new Error("geolocation unavailable"));
      navigator.geolocation.getCurrentPosition(resolve, reject, opts);
    });
  }

  $("locateBtn").addEventListener("click", () => {
    $("locateBtn").classList.add("active");
    getPosition()
      .then((pos) => {
        $("locateBtn").classList.remove("active");
        const { latitude: lat, longitude: lng } = pos.coords;
        setPoint("pickup", { label: `${lat.toFixed(5)}, ${lng.toFixed(5)}`, lat, lng });
        reverseGeocode(lat, lng).then((label) => {
          if (label && state.pickup) { state.pickup.label = label; $("pickup").value = label; }
        });
      })
      .catch(() => $("locateBtn").classList.remove("active"));
  });

  /* ---------- Geocoding: Photon primary (CORS-friendly), Nominatim fallback ---------- */
  const NOMINATIM = "https://nominatim.openstreetmap.org";
  const PHOTON = "https://photon.komoot.io";
  const photonLabel = (p) =>
    [p.name, p.district || p.suburb, p.city, p.state || p.country].filter(Boolean).slice(0, 3).join(", ");

  async function geocode(q) {
    try {
      const r = await fetch(`${PHOTON}/api/?q=${encodeURIComponent(q)}&limit=5&lat=${MOGADISHU[0]}&lon=${MOGADISHU[1]}`);
      if (r.ok) {
        const j = await r.json();
        const out = (j.features || [])
          .filter((f) => f.geometry && f.geometry.coordinates)
          .map((f) => ({ label: photonLabel(f.properties || {}), lat: f.geometry.coordinates[1], lng: f.geometry.coordinates[0] }))
          .filter((x) => x.label);
        if (out.length) return out;
      }
    } catch {}
    try {
      const url = `${NOMINATIM}/search?format=jsonv2&limit=5&countrycodes=so,dj,et,ke&q=${encodeURIComponent(q)}`;
      const r = await fetch(url, { headers: { Accept: "application/json" } });
      if (!r.ok) return [];
      return (await r.json()).map((x) => ({ label: shortLabel(x.display_name), lat: +x.lat, lng: +x.lon }));
    } catch { return []; }
  }

  async function reverseGeocode(lat, lng) {
    try {
      const r = await fetch(`${PHOTON}/reverse?lat=${lat}&lon=${lng}`);
      if (r.ok) {
        const j = await r.json();
        const f = j.features && j.features[0];
        const label = f && photonLabel(f.properties || {});
        if (label) return label;
      }
    } catch {}
    try {
      const r = await fetch(`${NOMINATIM}/reverse?format=jsonv2&lat=${lat}&lon=${lng}`, { headers: { Accept: "application/json" } });
      if (!r.ok) return null;
      const j = await r.json();
      return j.display_name ? shortLabel(j.display_name) : null;
    } catch { return null; }
  }
  function shortLabel(s) {
    return String(s).split(",").slice(0, 3).map((x) => x.trim()).join(", ");
  }

  function wireSearch(inputId, suggestId, kind) {
    const input = $(inputId), box = $(suggestId);
    let timer = null, seq = 0;
    input.addEventListener("input", () => {
      state[kind] = null; state.route = null;
      clearTimeout(timer);
      const q = input.value.trim();
      if (q.length < 3) { box.hidden = true; return; }
      timer = setTimeout(async () => {
        const mySeq = ++seq;
        box.innerHTML = `<button disabled>${t("app.searching")}</button>`;
        box.hidden = false;
        let results = [];
        try { results = await geocode(q); } catch {}
        if (mySeq !== seq) return;
        if (!results.length) {
          box.innerHTML = `<button disabled>${t("app.noResults")}</button>`;
          return;
        }
        box.innerHTML = "";
        results.forEach((res) => {
          const b = document.createElement("button");
          b.type = "button";
          b.textContent = res.label;
          b.addEventListener("click", () => { box.hidden = true; setPoint(kind, res); });
          box.appendChild(b);
        });
      }, 650);
    });
    document.addEventListener("click", (e) => {
      if (!box.contains(e.target) && e.target !== input) box.hidden = true;
    });
  }
  wireSearch("pickup", "pickupSuggest", "pickup");
  wireSearch("dropoff", "dropoffSuggest", "dropoff");

  /* ---------- Routing + fares ---------- */
  function haversineKm(a, b) {
    const R = 6371, d = Math.PI / 180;
    const dLat = (b.lat - a.lat) * d, dLng = (b.lng - a.lng) * d;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * d) * Math.cos(b.lat * d) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  async function fetchRoute() {
    const a = state.pickup, b = state.dropoff;
    if (!a || !b) return;
    let route = null;
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${a.lng},${a.lat};${b.lng},${b.lat}?overview=full&geometries=geojson`;
      const r = await fetch(url);
      if (r.ok) {
        const j = await r.json();
        if (j.routes && j.routes[0]) {
          const rt = j.routes[0];
          route = { distanceKm: rt.distance / 1000, durationMin: rt.duration / 60, approx: false };
          if (routeLine) routeLine.remove();
          routeLine = L.geoJSON(rt.geometry, { style: { color: "#9B1C2E", weight: 5, opacity: 0.9 } }).addTo(map);
        }
      }
    } catch {}
    if (!route) {
      const km = haversineKm(a, b) * 1.4;
      route = { distanceKm: km, durationMin: (km / 25) * 60, approx: true };
      if (routeLine) routeLine.remove();
      routeLine = L.polyline([[a.lat, a.lng], [b.lat, b.lng]], { color: "#9B1C2E", weight: 4, dashArray: "8 8", opacity: 0.8 }).addTo(map);
    }
    // guard against zero-distance
    route.distanceKm = Math.max(0.3, route.distanceKm);
    route.durationMin = Math.max(2, route.durationMin);
    state.route = route;
    renderVehicles();
    renderSummary();
  }

  function fareFor(v) {
    if (!state.route) return null;
    const f = v.base + v.perKm * state.route.distanceKm + v.perMin * state.route.durationMin;
    return Math.max(v.min, Math.round(f * 20) / 20); // round to 5 cents
  }
  const usd = (n) => `$${n.toFixed(2)}`;

  function renderVehicles() {
    const wrap = $("vehicles");
    wrap.innerHTML = "";
    VEHICLES.forEach((v) => {
      const fare = fareFor(v);
      const b = document.createElement("button");
      b.type = "button";
      b.className = "vehicle" + (state.vehicle === v.id ? " selected" : "");
      b.innerHTML =
        `<span class="v-icon">${v.icon}</span>` +
        `<span><span class="v-name">${t(v.nameKey)}</span><br><span class="v-desc">${t(v.descKey)}</span></span>` +
        `<span class="v-fare">${fare != null ? usd(fare) : "—"}</span>`;
      b.addEventListener("click", () => { state.vehicle = v.id; renderVehicles(); });
      wrap.appendChild(b);
    });
  }

  function renderSummary() {
    const el = $("tripSummary");
    if (!state.route) { el.hidden = true; return; }
    const r = state.route;
    el.hidden = false;
    el.innerHTML =
      `<span>${r.approx ? t("app.approx") + " " : ""}<b>${r.distanceKm.toFixed(1)}</b> ${t("app.km")}</span>` +
      `<span>~<b>${Math.round(r.durationMin)}</b> ${t("app.min")}</span>`;
  }

  /* ---------- When: now / later ---------- */
  const pad = (n) => String(n).padStart(2, "0");
  function toLocalInput(d) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  $("whenNow").addEventListener("click", () => {
    state.when = "now";
    $("whenNow").classList.add("active");
    $("whenLater").classList.remove("active");
    $("whenField").hidden = true;
  });
  $("whenLater").addEventListener("click", () => {
    $("whenLater").classList.add("active");
    $("whenNow").classList.remove("active");
    const input = $("whenInput");
    const now = new Date(Date.now() + 30 * 60000);
    const max = new Date(Date.now() + 7 * 86400000);
    input.min = toLocalInput(now);
    input.max = toLocalInput(max);
    if (!input.value) input.value = toLocalInput(now);
    state.when = input.value;
    $("whenField").hidden = false;
  });
  $("whenInput").addEventListener("change", (e) => { state.when = e.target.value || "now"; });

  /* ---------- Steps ---------- */
  function showStep(n) {
    state.step = n;
    $("step1").hidden = n !== 1;
    $("step2").hidden = n !== 2;
    $("step3").hidden = n !== 3;
    $("stepDone").hidden = n !== 4;
    $("stepNav").style.display = n === 4 ? "none" : "flex";
    $("backBtn").hidden = n === 1;
    $("nextBtn").textContent = n === 3 ? t("app.confirm") : t("app.next");
    const bars = $("stepper").children;
    for (let i = 0; i < 3; i++) bars[i].className = i < Math.min(n, 3) ? "on" : "";
    $("stepper").style.display = n === 4 ? "none" : "flex";
  }

  function fieldError(id, msg) {
    const f = $(id).closest(".field");
    f.classList.add("invalid");
    f.querySelector(".err").textContent = msg;
  }
  function clearFieldError(id) {
    const f = $(id).closest(".field");
    if (!f) return;
    f.classList.remove("invalid");
    const e = f.querySelector(".err");
    if (e) e.textContent = "";
  }

  $("backBtn").addEventListener("click", () => showStep(Math.max(1, state.step - 1)));
  $("nextBtn").addEventListener("click", () => {
    if (state.step === 1) {
      let ok = true;
      if (!state.pickup) { fieldError("pickup", t("app.errPickup")); ok = false; }
      if (!state.dropoff) { fieldError("dropoff", t("app.errDrop")); ok = false; }
      if (!ok) return;
      if (!state.route) fetchRoute();
      renderVehicles();
      renderSummary();
      showStep(2);
    } else if (state.step === 2) {
      showStep(3);
    } else if (state.step === 3) {
      submit();
    }
  });

  /* ---------- Submit ---------- */
  async function submit() {
    if (state.submitting) return;
    clearFieldError("name"); clearFieldError("phone");
    $("formMsg").className = "form-msg";
    const name = $("name").value.trim();
    const phone = $("phone").value.trim();
    let ok = true;
    if (!name) { fieldError("name", t("app.errName")); ok = false; }
    if (phone.replace(/\D/g, "").length < 6) { fieldError("phone", t("app.errPhone")); ok = false; }
    if (!ok) return;

    state.submitting = true;
    const btn = $("nextBtn");
    btn.disabled = true;
    btn.textContent = t("app.sending");

    const body = {
      siteId: SITE_ID,
      type: "ride",
      name,
      phone,
      pickup: state.pickup.label,
      dropoff: state.dropoff.label,
      pickupLat: state.pickup.lat, pickupLng: state.pickup.lng,
      dropLat: state.dropoff.lat, dropLng: state.dropoff.lng,
      vehicle: state.vehicle,
      when: state.when,
      payment: $("payment").value,
      notes: $("notes").value.trim(),
      company_website: $("company_website").value,
    };
    if (state.route) {
      const v = VEHICLES.find((x) => x.id === state.vehicle);
      body.fare = fareFor(v);
      body.distanceKm = Math.round(state.route.distanceKm * 10) / 10;
      body.durationMin = Math.round(state.route.durationMin);
    }

    try {
      const r = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) {
        state.lastRef = j.id;
        $("rideRef").textContent = `Ref: ${j.id}`;
        showStep(4);
      } else {
        const msg = (j.errors && j.errors.join(" · ")) || j.error || t("app.errNet");
        $("formMsg").className = "form-msg error";
        $("formMsg").textContent = msg;
      }
    } catch {
      $("formMsg").className = "form-msg error";
      $("formMsg").textContent = t("app.errNet");
    } finally {
      state.submitting = false;
      btn.disabled = false;
      btn.textContent = state.step === 3 ? t("app.confirm") : t("app.next");
    }
  }

  /* ---------- Share + reset ---------- */
  $("shareBtn").addEventListener("click", () => {
    const v = VEHICLES.find((x) => x.id === state.vehicle);
    const fare = state.route && v ? ` (~${usd(fareFor(v))})` : "";
    const text =
      `🚕 Raac ride ${state.lastRef ? "· Ref " + state.lastRef : ""}\n` +
      `From: ${state.pickup.label}\nTo: ${state.dropoff.label}${fare}\n` +
      `${state.when === "now" ? "Leaving now" : "Pickup at " + state.when}\n` +
      `Booked on https://raac-ride.vercel.app/app`;
    if (navigator.share) {
      navigator.share({ text }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    }
  });

  $("newRideBtn").addEventListener("click", () => {
    setPoint("pickup", null);
    setPoint("dropoff", null);
    $("name").value = ""; $("notes").value = "";
    state.route = null;
    map.setView(MOGADISHU, 13);
    showStep(1);
  });

  /* Re-render dynamic bits when language changes */
  document.addEventListener("raac:lang", () => {
    renderVehicles();
    renderSummary();
    $("nextBtn").textContent = state.step === 3 ? t("app.confirm") : t("app.next");
  });

  renderVehicles();
  showStep(1);
})();
