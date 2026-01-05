
const CACHE_NAME = 'shikoku-v2';

// 初始僅緩存必備文件
const urlsToCache = [
  '/',
  '/index.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  // 採用網路優先策略；若失敗則嘗試快取資源，最後退回到 index.html（SPA fallback）
  event.respondWith(
    fetch(event.request)
      .then(response => response)
      .catch(() => {
        return caches.match(event.request).then(cached => cached || caches.match('/index.html'));
      })
  );
});
