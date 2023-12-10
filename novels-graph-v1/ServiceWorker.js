const cacheName = "DefaultCompany-Online VN Graph-0.0.39.7461de2";
const contentToCache = [
    "Build/web-graph.loader.js",
    "Build/c6697ba14e0dc3be62afc3aa5ab9b2e8.js",
    "Build/f6161c30a27d4a22f97ae6bddae00568.data",
    "Build/e53d5ba612f6e4d80be737b8c7f4eee3.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
