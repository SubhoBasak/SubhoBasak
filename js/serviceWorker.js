var CACHE_NAME = "subho-website-pwa";
var urlsToCache = [
  "/SubhoBasak/index.html",
  "/SubhoBasak/about.html",
  "/SubhoBasak/education.html",
  "/SubhoBasak/skills.html",
  "/SubhoBasak/gallery.html",
  "/SubhoBasak/gallery2.html",
  "/SubhoBasak/contact.html",
  "/SubhoBasak/sitemap.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  var cacheWhitelist = ["subho-website-pwa"];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
