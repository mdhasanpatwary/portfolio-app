// Service Worker for PWA functionality
const CACHE_NAME = 'hasan-portfolio-v1'
const urlsToCache = [
  '/',
  '/favicon/android-chrome-192x192.png',
  '/favicon/android-chrome-512x512.png',
  '/profile.webp',
  '/profile2.webp',
  '/favicon/favicon-32x32.png',
  '/favicon/favicon-16x16.png',
  '/favicon/apple-touch-icon.png',
  '/favicon/site.webmanifest',
  '/resume.pdf'
]

// Install event - cache resources
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache)
    })
  )
})

// Fetch event - serve from cache when offline
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Return cached version or fetch from network
      return response || fetch(event.request)
    })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Push event - handle push notifications
self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: data.icon || '/favicon/android-chrome-192x192.png',
      badge: data.badge || '/favicon/favicon-32x32.png',
      vibrate: [100, 50, 100],
      data: data.data || {
        dateOfArrival: Date.now(),
        primaryKey: '1',
      },
      actions: [
        {
          action: 'open',
          title: 'Open App',
          icon: '/favicon/favicon-32x32.png',
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/favicon/favicon-32x32.png',
        },
      ],
    }
    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})

// Notification click event
self.addEventListener('notificationclick', function (event) {
  console.log('Notification click received.')
  
  event.notification.close()

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('https://patwary.vercel.app')
    )
  } else if (event.action === 'close') {
    // Just close the notification
    return
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('https://patwary.vercel.app')
    )
  }
})

// Background sync for offline functionality
self.addEventListener('sync', function (event) {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

function doBackgroundSync() {
  // Implement background sync logic here
  console.log('Background sync triggered')
  return Promise.resolve()
} 