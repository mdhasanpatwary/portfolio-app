// Service Worker for PWA functionality - Offline Caching
const CACHE_NAME = 'hasan-portfolio-v1';
const API_CACHE_NAME = 'hasan-portfolio-api-v1';
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
  // Handle Dev.to API requests with cache-first strategy
  if (event.request.url.includes('dev.to/api/articles')) {
    event.respondWith(handleBlogApiRequest(event.request));
    return;
  }

  // Skip caching for other external APIs and unsupported schemes
  if (event.request.url.includes('api') || !event.request.url.startsWith('http')) {
    event.respondWith(fetch(event.request).catch(() => new Response('', { status: 404 })));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Return cached version or fetch from network
      return response || fetch(event.request).then(function (fetchResponse) {
        // Cache new responses for future offline use (only for same-origin requests)
        if (fetchResponse && fetchResponse.status === 200 && event.request.url.startsWith(self.location.origin)) {
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
  const validCaches = [CACHE_NAME, API_CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (!validCaches.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
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

// Handle blog API requests with cache-first strategy
async function handleBlogApiRequest(request) {
  const cache = await caches.open(API_CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  try {
    // Try to fetch fresh data
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache the fresh response
      await cache.put(request, networkResponse.clone());
      console.log('Blog data updated from network and cached');
      return networkResponse;
    }
    
    // If network fails but we have cached data, return it
    if (cachedResponse) {
      console.log('Network failed, serving cached blog data');
      return cachedResponse;
    }
    
    throw new Error('Network failed and no cache available');
  } catch (error) {
    // Network failed, try to serve from cache
    if (cachedResponse) {
      console.log('Serving cached blog data (offline)');
      return cachedResponse;
    }
    
    // No cache available, return empty array as fallback
    console.log('No cached blog data available, returning empty array');
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

function doBackgroundSync() {
  // Implement background sync logic here if needed
  console.log('Background sync triggered');
  return Promise.resolve();
} 