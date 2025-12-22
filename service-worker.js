self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("positive-cache").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./style.css",
        "./script.js"
      ]);
    })
  );
});
