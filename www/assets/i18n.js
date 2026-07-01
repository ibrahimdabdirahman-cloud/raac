/* Raac i18n — EN / Somali. Apply via data-i18n (text), data-i18n-ph (placeholder). */
(function () {
  const DICT = {
    en: {
      "nav.how": "How it works",
      "nav.services": "Services",
      "nav.safety": "Safety",
      "nav.drivers": "Drive with us",
      "nav.book": "Book a ride",

      "hero.kicker": "Ride hailing for the Somali world",
      "hero.title": "Book a ride in 30 seconds. Right from your browser.",
      "hero.lede": "No download. No sign-up. See your fare before you book, pay cash or mobile money, and share your trip with family — in English or af Soomaali.",
      "hero.cta": "Book a ride now",
      "hero.cta2": "Become a driver",
      "hero.stat1b": "Upfront fares",
      "hero.stat1": "know the price before you ride",
      "hero.stat2b": "2 languages",
      "hero.stat2": "English & af Soomaali",
      "hero.stat3b": "0 downloads",
      "hero.stat3": "works in any browser",

      "how.kicker": "How it works",
      "how.title": "Three taps and you're moving",
      "how.1t": "Set pickup & destination",
      "how.1p": "Type an address, tap the map, or use your location. Live map of your city, no app needed.",
      "how.2t": "Pick your ride & see the fare",
      "how.2p": "Bajaaj, saloon, XL or delivery — every option shows a real fare estimate up front. No surprises.",
      "how.3t": "Confirm — a driver calls you",
      "how.3p": "Ride now or schedule up to 7 days ahead. Pay cash, EVC Plus or eDahab when you arrive.",

      "svc.kicker": "Services",
      "svc.title": "A ride for every journey",
      "svc.bajaaj": "Bajaaj",
      "svc.bajaajd": "The city classic. Quick, cheap hops across town.",
      "svc.caadi": "Caadi",
      "svc.caadid": "Comfortable saloon cars for everyday trips.",
      "svc.xl": "XL / Family",
      "svc.xld": "7 seats for family trips, airport runs and groups.",
      "svc.delivery": "Delivery",
      "svc.deliveryd": "Parcels and packages across the city, tracked.",
      "svc.from": "from",

      "cmp.kicker": "Why Raac",
      "cmp.title": "Built to beat the apps you know",
      "cmp.feature": "Feature",
      "cmp.others": "Other ride apps",
      "cmp.r1": "Book from the browser, no download",
      "cmp.r2": "Fare shown before you book",
      "cmp.r3": "English & af Soomaali",
      "cmp.r4": "Schedule up to 7 days ahead",
      "cmp.r5": "Share your live trip with family",
      "cmp.apponly": "App only",
      "cmp.sometimes": "Sometimes",

      "safe.kicker": "Safety",
      "safe.title": "Your people always know where you are",
      "safe.1t": "Share your trip",
      "safe.1p": "One tap sends your pickup, destination and ride reference to family on WhatsApp.",
      "safe.2t": "Verified drivers",
      "safe.2p": "Every driver is interviewed, documented and trained before their first ride.",
      "safe.3t": "24/7 support",
      "safe.3p": "A real human on WhatsApp, day and night. No bots, no dead ends.",

      "drv.kicker": "Drive with Raac",
      "drv.title": "Your car. Your hours. Your money.",
      "drv.lede": "Low commission, weekly payouts, and a dispatch team that fills your day. Apply in two minutes.",
      "drv.cta": "Apply to drive",

      "cta.title": "Ready to go?",
      "cta.lede": "Your next ride is 30 seconds away — no download, no account.",

      "foot.tagline": "Ride hailing for the Somali world.",
      "foot.home": "Home",
      "foot.book": "Book a ride",
      "foot.drive": "Drive with us",
      "foot.rights": "All rights reserved.",

      /* Booking app */
      "app.step1": "Where are you going?",
      "app.pickup": "Pickup",
      "app.pickupPh": "Search pickup location…",
      "app.dropoff": "Destination",
      "app.dropoffPh": "Where to?",
      "app.locate": "Use my location",
      "app.pinmap": "Set on map",
      "app.hintPickup": "Tap the map to set your pickup",
      "app.hintDrop": "Tap the map to set your destination",
      "app.next": "Continue",
      "app.back": "Back",
      "app.step2": "Choose your ride",
      "app.now": "Ride now",
      "app.later": "Schedule",
      "app.whenLabel": "Pickup time",
      "app.approx": "approx.",
      "app.km": "km",
      "app.min": "min",
      "app.step3": "Almost there",
      "app.name": "Your name",
      "app.namePh": "e.g. Ayaan Mohamed",
      "app.phone": "Phone number",
      "app.phonePh": "e.g. 061 2345678",
      "app.payment": "Payment",
      "app.cash": "Cash",
      "app.notes": "Note for the driver (optional)",
      "app.notesPh": "Landmark, gate colour, extra stop…",
      "app.confirm": "Confirm ride",
      "app.sending": "Requesting…",
      "app.successT": "Ride requested!",
      "app.successP": "A driver will call you shortly to confirm your pickup.",
      "app.shareTrip": "Share trip with family",
      "app.newRide": "Book another ride",
      "app.errNet": "Couldn't reach the server. Check your connection and try again.",
      "app.errPickup": "Set a pickup location",
      "app.errDrop": "Set a destination",
      "app.errName": "Please add your name",
      "app.errPhone": "Add a valid phone number",
      "app.fareNote": "Final fare may vary slightly with traffic.",
      "app.searching": "Searching…",
      "app.noResults": "No results — try the map pin instead",

      /* Driver page */
      "drvp.title": "Drive with Raac",
      "drvp.lede": "Set your own hours, keep more of every fare, and get paid weekly. Fill this in — we'll call you within 48 hours.",
      "drvp.b1t": "Low commission",
      "drvp.b1p": "You keep more of every ride than on any other platform.",
      "drvp.b2t": "Weekly payouts",
      "drvp.b2p": "Cash out to EVC Plus, eDahab or bank every week.",
      "drvp.b3t": "Flexible hours",
      "drvp.b3p": "Drive mornings, nights or weekends. You decide.",
      "drvp.city": "City",
      "drvp.vehicle": "Your vehicle",
      "drvp.exp": "Driving experience",
      "drvp.exp0": "Less than 1 year",
      "drvp.exp1": "1–3 years",
      "drvp.exp2": "3–5 years",
      "drvp.exp3": "5+ years",
      "drvp.notes": "Anything else? (optional)",
      "drvp.apply": "Send application",
      "drvp.successT": "Application received!",
      "drvp.successP": "Our team will call you within 48 hours.",
    },

    so: {
      "nav.how": "Sida uu u shaqeeyo",
      "nav.services": "Adeegyada",
      "nav.safety": "Nabadgelyada",
      "nav.drivers": "Nala wad",
      "nav.book": "Dalbo gaari",

      "hero.kicker": "Raadinta gaariga ee dunida Soomaaliyeed",
      "hero.title": "Dalbo gaari 30 ilbiriqsi gudahood. Toos browser-kaaga.",
      "hero.lede": "Wax download ah ma jiro. Diiwaangelin ma jirto. Arag qiimaha ka hor inta aadan dalban, ku bixi lacag caddaan ah ama mobile money, laguna wadaag safarkaaga qoyskaaga — Ingiriisi ama af Soomaali.",
      "hero.cta": "Hadda dalbo gaari",
      "hero.cta2": "Noqo darawal",
      "hero.stat1b": "Qiimo hore loo yaqaan",
      "hero.stat1": "ogow qiimaha ka hor safarka",
      "hero.stat2b": "2 luqadood",
      "hero.stat2": "Ingiriisi & af Soomaali",
      "hero.stat3b": "0 download",
      "hero.stat3": "wuxuu ka shaqeeyaa browser kasta",

      "how.kicker": "Sida uu u shaqeeyo",
      "how.title": "Saddex taabasho ayaad ku socotaa",
      "how.1t": "Deji goobta laga qaadayo & meesha aad u socoto",
      "how.1p": "Qor cinwaanka, taabo khariidadda, ama isticmaal goobtaada. Khariidad toos ah oo magaaladaada ah, app la'aan.",
      "how.2t": "Dooro gaarigaaga & arag qiimaha",
      "how.2p": "Bajaaj, caadi, XL ama delivery — mid kastaa wuxuu muujiyaa qiimaha saxda ah horay. Yaab ma jiro.",
      "how.3t": "Xaqiiji — darawal ayaa ku soo wacaya",
      "how.3p": "Hadda raac ama jadwal geli ilaa 7 maalmood ka hor. Ku bixi caddaan, EVC Plus ama eDahab markaad gaarto.",

      "svc.kicker": "Adeegyada",
      "svc.title": "Gaari safar kasta ku habboon",
      "svc.bajaaj": "Bajaaj",
      "svc.bajaajd": "Gaariga caanka ah ee magaalada. Degdeg, jaban.",
      "svc.caadi": "Caadi",
      "svc.caadid": "Gaariyo raaxo leh oo safarada maalinlaha ah.",
      "svc.xl": "XL / Qoys",
      "svc.xld": "7 kursi oo loogu talagalay qoysaska, garoonka iyo kooxaha.",
      "svc.delivery": "Delivery",
      "svc.deliveryd": "Xirmooyin iyo baakadaha magaalada oo dhan, la raacayo.",
      "svc.from": "laga bilaabo",

      "cmp.kicker": "Maxaad Raac u dooranaysaa",
      "cmp.title": "Waxaa loo dhisay inuu ka fiicnaado app-yada aad taqaan",
      "cmp.feature": "Adeeg",
      "cmp.others": "App-yada kale",
      "cmp.r1": "Ka dalbo browser-ka, download la'aan",
      "cmp.r2": "Qiimaha ayaa la muujiyaa ka hor dalabka",
      "cmp.r3": "Ingiriisi & af Soomaali",
      "cmp.r4": "Jadwal geli ilaa 7 maalmood ka hor",
      "cmp.r5": "La wadaag safarkaaga qoyskaaga",
      "cmp.apponly": "App keliya",
      "cmp.sometimes": "Mararka qaar",

      "safe.kicker": "Nabadgelyada",
      "safe.title": "Dadkaagu had iyo jeer way ogyihiin meesha aad joogto",
      "safe.1t": "La wadaag safarkaaga",
      "safe.1p": "Hal taabasho ayaa qoyskaaga WhatsApp ugu dirta goobta, meesha aad u socoto iyo lambarka safarka.",
      "safe.2t": "Darawallo la xaqiijiyay",
      "safe.2p": "Darawal kasta waa la waraystay, waa la diiwaangeliyay, waana la tababaray safarka ugu horreeya ka hor.",
      "safe.3t": "Taageero 24/7",
      "safe.3p": "Qof dhab ah oo WhatsApp ku jira, habeen iyo maalin. Bot ma jiro.",

      "drv.kicker": "La wad Raac",
      "drv.title": "Gaarigaaga. Saacadahaaga. Lacagtaada.",
      "drv.lede": "Komishan yar, mushahar toddobaadle ah, iyo koox dispatch ah oo maalintaada buuxisa. Codso laba daqiiqo gudahood.",
      "drv.cta": "Codso inaad wadato",

      "cta.title": "Diyaar ma u tahay?",
      "cta.lede": "Safarkaaga xiga wuxuu jiraa 30 ilbiriqsi — download iyo akoon la'aan.",

      "foot.tagline": "Raadinta gaariga ee dunida Soomaaliyeed.",
      "foot.home": "Bogga hore",
      "foot.book": "Dalbo gaari",
      "foot.drive": "Nala wad",
      "foot.rights": "Xuquuqda oo dhan waa la dhowray.",

      "app.step1": "Xaggee u socotaa?",
      "app.pickup": "Laga qaadayo",
      "app.pickupPh": "Raadi goobta lagaa qaadayo…",
      "app.dropoff": "Meesha aad u socoto",
      "app.dropoffPh": "Xaggee?",
      "app.locate": "Isticmaal goobtayda",
      "app.pinmap": "Ku deji khariidadda",
      "app.hintPickup": "Taabo khariidadda si aad u dejiso goobta lagaa qaadayo",
      "app.hintDrop": "Taabo khariidadda si aad u dejiso meesha aad u socoto",
      "app.next": "Sii wad",
      "app.back": "Dib u noqo",
      "app.step2": "Dooro gaarigaaga",
      "app.now": "Hadda raac",
      "app.later": "Jadwal geli",
      "app.whenLabel": "Waqtiga lagaa qaadayo",
      "app.approx": "qiyaas ahaan",
      "app.km": "km",
      "app.min": "daqiiqo",
      "app.step3": "Waad ku dhowdahay",
      "app.name": "Magacaaga",
      "app.namePh": "tusaale: Ayaan Maxamed",
      "app.phone": "Lambarka telefoonka",
      "app.phonePh": "tusaale: 061 2345678",
      "app.payment": "Lacag bixinta",
      "app.cash": "Caddaan",
      "app.notes": "Farriin darawalka (ikhtiyaari)",
      "app.notesPh": "Calaamad, midabka albaabka, joogsi dheeri ah…",
      "app.confirm": "Xaqiiji safarka",
      "app.sending": "Waa la dirayaa…",
      "app.successT": "Safarka waa la dalbay!",
      "app.successP": "Darawal ayaa dhowaan kuu soo wacaya si uu u xaqiijiyo.",
      "app.shareTrip": "La wadaag safarka qoyska",
      "app.newRide": "Dalbo safar kale",
      "app.errNet": "Server-ka lama gaari karo. Hubi internet-kaaga, ku celi.",
      "app.errPickup": "Deji goobta lagaa qaadayo",
      "app.errDrop": "Deji meesha aad u socoto",
      "app.errName": "Fadlan ku dar magacaaga",
      "app.errPhone": "Geli lambar telefoon oo sax ah",
      "app.fareNote": "Qiimaha kama dambaysta ah wuu isbeddeli karaa xoogaa.",
      "app.searching": "Waa la raadinayaa…",
      "app.noResults": "Natiijo ma jirto — isku day biinka khariidadda",

      "drvp.title": "La wad Raac",
      "drvp.lede": "Dooro saacadahaaga, hayso lacag badan safar kasta, mushaharna qaado toddobaad kasta. Buuxi foomkan — 48 saacadood gudahood ayaan kuu soo wacaynaa.",
      "drvp.b1t": "Komishan yar",
      "drvp.b1p": "Safar kasta waxaad haysataa lacag ka badan platform kasta oo kale.",
      "drvp.b2t": "Mushahar toddobaadle",
      "drvp.b2p": "Toddobaad kasta kula soo bax EVC Plus, eDahab ama bangi.",
      "drvp.b3t": "Saacado dabacsan",
      "drvp.b3p": "Wad subaxdii, habeenkii ama sabtida iyo axadda. Adigaa go'aaminaya.",
      "drvp.city": "Magaalada",
      "drvp.vehicle": "Gaarigaaga",
      "drvp.exp": "Khibradda wadista",
      "drvp.exp0": "Wax ka yar 1 sano",
      "drvp.exp1": "1–3 sano",
      "drvp.exp2": "3–5 sano",
      "drvp.exp3": "5+ sano",
      "drvp.notes": "Wax kale? (ikhtiyaari)",
      "drvp.apply": "Dir codsiga",
      "drvp.successT": "Codsiga waa la helay!",
      "drvp.successP": "Kooxdayadu waxay kuu soo wacaysaa 48 saacadood gudahood.",
    },
  };

  let lang = localStorage.getItem("raac-lang") || "en";
  if (!DICT[lang]) lang = "en";

  function t(key) {
    return (DICT[lang] && DICT[lang][key]) || DICT.en[key] || key;
  }

  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
    });
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const v = t(el.getAttribute("data-i18n-title"));
      el.setAttribute("title", v);
      el.setAttribute("aria-label", v);
    });
    document.querySelectorAll("[data-lang-toggle]").forEach((el) => {
      el.textContent = lang === "en" ? "SO" : "EN";
    });
    document.dispatchEvent(new CustomEvent("raac:lang", { detail: { lang } }));
  }

  function toggle() {
    lang = lang === "en" ? "so" : "en";
    localStorage.setItem("raac-lang", lang);
    apply();
  }

  window.RaacI18n = { t, apply, toggle, get lang() { return lang; } };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-lang-toggle]").forEach((el) => el.addEventListener("click", toggle));
    apply();
  });
})();
