const cacheName = "DefaultCompany-Online VN Graph-0.0.35.6b94201";
const contentToCache = [
    "Build/web-graph.loader.js",
    "Build/3fce9ef5e3ce8f1f69347b60ba53a11d.js",
    "Build/c44c7b72a3619a649802fc81040c57b0.data",
    "Build/3d04dc85d6aa4e21c78c2fec0038c2ea.wasm",
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
