const cacheName = "DefaultCompany-Novels Graph-0.1";
const contentToCache = [
    "Build/web-graph.loader.js",
    "Build/f1a831ca77906c174df7e822f2a99b64.js",
    "Build/93cf1776c610e8899c1612957655feb6.data",
    "Build/62140748c66c0b9ed22bfb97414123f8.wasm",
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
