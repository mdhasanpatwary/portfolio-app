// Service Worker for PWA functionality - Offline Caching
const CACHE_VERSION = 'v4';
const CACHE_NAME = `hasan-portfolio-${CACHE_VERSION}`;
const API_CACHE_NAME = `hasan-portfolio-api-${CACHE_VERSION}`;
const DEV_MODE = self.location.hostname === 'localhost' ||
                 self.location.hostname === '127.0.0.1' ||
                 self.location.hostname.includes('localhost');

// Pre-cache immutable/static assets and key HTML routes. Network-first is enforced for HTML.
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
  // Skip everything in development mode
  if (DEV_MODE) {
    self.skipWaiting();
    return;
  }

  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
  // Activate updated SW immediately
  self.skipWaiting();
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', function (event) {
  // Skip service worker in development mode for better DX
  if (DEV_MODE) {
    return;
  }

  // Network-first for navigations/HTML
  const acceptHeader = event.request.headers.get('accept') || '';
  const isNavigation = event.request.mode === 'navigate' || acceptHeader.includes('text/html');
  if (isNavigation) {
    event.respondWith(
      fetch(event.request)
        .then((response) => response)
        .catch(() => caches.match(event.request))
    );
    return;
  }

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
        // Cache new responses for future offline use (same-origin resources). Skip caching HTML for network-first, but allow
        // caching of other assets (Next.js hashed chunks, images, CSS, etc.).
        const shouldCache =
          fetchResponse &&
          fetchResponse.status === 200 &&
          event.request.url.startsWith(self.location.origin) &&
          !(acceptHeader.includes('text/html'));
        if (shouldCache) {
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
  // Skip cache cleanup in development mode
  if (DEV_MODE) {
    self.clients.claim();
    return;
  }

  const validCaches = [CACHE_NAME, API_CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (!validCaches.includes(cacheName)) {
            // remove old cache
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Background sync for offline functionality
self.addEventListener('sync', function (event) {
  // Skip background sync in development mode
  if (DEV_MODE) {
    return;
  }

  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Handle blog API requests with cache-first strategy
async function handleBlogApiRequest(request) {
  // Skip API caching in development mode
  if (DEV_MODE) {
    return fetch(request);
  }

  const cache = await caches.open(API_CACHE_NAME);
  const cachedResponse = await cache.match(request);

  try {
    // Try to fetch fresh data
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      // Cache the fresh response
      await cache.put(request, networkResponse.clone());
      return networkResponse;
    }

    // If network fails but we have cached data, return it
    if (cachedResponse) {
      return cachedResponse;
    }

    throw new Error('Network failed and no cache available');
  } catch (error) {
    // Network failed, try to serve from cache
    if (cachedResponse) {
      return cachedResponse;
    }

    // No cache available, return empty array as fallback
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

function doBackgroundSync() {
  // Implement background sync logic here if needed
  if (DEV_MODE) {
    return Promise.resolve();
  }
  return Promise.resolve();
}