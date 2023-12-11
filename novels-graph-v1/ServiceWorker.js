const cacheName = "DefaultCompany-Novels Graph-0.1";
const contentToCache = [
    "Build/web-graph.loader.js",
    "Build/6239f4a42b1a935c787229d8270ab8f1.js",
    "Build/28d1b7e45bdbe74ca792fc7073a0108f.data",
    "Build/90e7e6511fd27303baa5a8fa882a6a2c.wasm",
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
