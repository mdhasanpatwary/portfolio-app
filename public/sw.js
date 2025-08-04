// Service Worker for PWA functionality - Offline Caching
const CACHE_NAME = 'hasan-portfolio-v1';
const urlsToCache = [
  '/',
  '/about',
  '/projects',
  '/blog',
  '/contact',
  '/css-tips',
  '/favicon/android-chrome-192x192.png',
  '/favicon/android-chrome-512x512.png',
  '/profile.webp',
  '/profile2.webp',
  '/favicon/favicon-32x32.png',
  '/favicon/favicon-16x16.png',
  '/favicon/apple-touch-icon.png',
  '/favicon/site.webmanifest',
  '/resume.pdf',
  '/globe.svg',
  '/file.svg',
  '/window.svg'
];

// Install event - cache resources
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Return cached version or fetch from network
      return response || fetch(event.request).then(function (fetchResponse) {
        // Cache new responses for future offline use
        if (fetchResponse && fetchResponse.status === 200) {
          const responseToCache = fetchResponse.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, responseToCache);
          });
        }
        return fetchResponse;
      }).catch(function () {
        // If network fails and we have a cached version, return it
        return caches.match(event.request);
      });
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', function (event) {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Implement background sync logic here if needed
  console.log('Background sync triggered');
  return Promise.resolve();
} 