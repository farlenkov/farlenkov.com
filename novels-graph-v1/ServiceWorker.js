const cacheName = "DefaultCompany-Novels Graph-0.1";
const contentToCache = [
    "Build/web-graph.loader.js",
    "Build/788f1e2b9b301355f362ef13b7a07f61.js",
    "Build/281de8ef38dd3258089fb1f6aa20698f.data",
    "Build/2f27618677e95e7aa056e2c24d9da58c.wasm",
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
