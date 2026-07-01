/* Raac service worker — network-first pages, cache-first same-origin assets. */
const VERSION = "raac-v2";
const SHELL = [
  "/", "/app", "/driver",
  "/assets/raac.css", "/assets/app.js", "/assets/i18n.js", "/assets/icon.svg",
  "/manifest.webmanifest",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return; // never touch APIs/tiles

  // Network-first for everything same-origin so deploys propagate immediately;
  // the cache is only an offline fallback.
  e.respondWith(
    fetch(e.request)
      .then((r) => {
        const copy = r.clone();
        caches.open(VERSION).then((c) => c.put(e.request, copy));
        return r;
      })
      .catch(() =>
        caches.match(e.request).then((r) => r || (e.request.mode === "navigate" ? caches.match("/") : Response.error()))
      )
  );
});
