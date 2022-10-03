const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching

// const cacheName = 'static-resources';
// const offlineFallback = ({ request }) => {
//   console.log(request);
//   return (
//     request.destination === 'style' ||
//     request.destination === 'script'
//   );
// };
// const CACHE_NAME = 'cache-v1';
// const urlsToCache = [
//   '/',
//   '/index.html',
//   '/css/style.css',
//   '/index.js',
//   "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/codemirror.min.css",
//   "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/codemirror.min.js",
//   "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/mode/javascript/javascript.min.js",
//   "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/monokai.min.css",
//   '/images/logo.png'
// ];
// self.addEventListener('install', (e) => 
// e.waitUntil(
//   caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
// ))

// self.addEventListener('activate', (e) => {
//   e.waitUntil(clients.claim());
// })

// self.addEventListener('fetch', (e) =>
// e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)))
// );

registerRoute();
