const CACHE_NAME = 'palacio-em-letras-v7';
const APP_SHELL = [
  './',
  './index.html',
  './wordfind.css',
  './jquery-1.7.1.min.js',
  './wordfind.js',
  './wordfindgame.js',
  './logo.png',
  './fachada-biscainhos.jpg',
  './acanto.svg',
  './icon.svg',
  './manifest.webmanifest',
  './creditos.html',
  './bach-cello-suite-1.ogg',
  './handel-water-music.ogg',
  './bach-brandenburg-3.ogg',
  './vivaldi-spring.ogg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      if (new URL(event.request.url).origin === self.location.origin) {
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      }
      return response;
    }))
  );
});
