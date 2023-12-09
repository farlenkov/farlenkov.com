const cacheName = "DefaultCompany-Online VN Graph-0.0.37.86bad6f";
const contentToCache = [
    "Build/web-graph.loader.js",
    "Build/8dc842004d0ba0152eea0211c42e1483.js",
    "Build/52e8161ed40f9d4cb790a8b675b73ed6.data",
    "Build/af1468e9ee4de1bed6ead6d612d728f9.wasm",
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
