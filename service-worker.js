if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js')
      .then(function() {
          console.log('Pendaftaran ServiceWorker berhasil');
      })
      .catch(function(){
          console.log('Pendaftaran ServiceWorker gagal');
      });
  })
} else {
  console.log("ServiceWorker belum didukung browser ini.")
}    

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

  workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/icon.png', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/table.html', revision: '1' },
    { url: '/teamdetail.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/table-sw.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/index-serviceworker.js', revision: '1' },
    { url: '/js/detail-serviceworker.js', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/fontawesome.min.css', revision: '1' },
    { url: '/css/fontawesome.css', revision: '1' },
    { url: '/css/all.css', revision: '1' },
    { url: '/webfonts/fa-brands-400.eot', revision: '1' },
    { url: '/webfonts/fa-brands-400.svg', revision: '1' },
    { url: '/webfonts/fa-brands-400.ttf', revision: '1' },
    { url: '/webfonts/fa-brands-400.woff', revision: '1' },
    { url: '/webfonts/fa-brands-400.woff2', revision: '1' },
    { url: '/webfonts/fa-regular-400.eot', revision: '1' },
    { url: '/webfonts/fa-regular-400.svg', revision: '1' },
    { url: '/webfonts/fa-regular-400.ttf', revision: '1' },
    { url: '/webfonts/fa-regular-400.woff', revision: '1' },
    { url: '/webfonts/fa-regular-400.woff2', revision: '1' },
  ],
    {ignoreUrlParametersMatching: [/.*/]
  });

  workbox.routing.registerRoute(
    new RegExp('/pages/'),
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'pages'
      })
  );

  workbox.routing.registerRoute(
    new RegExp('https://www.thesportsdb.com/api/v1/json/1/'),
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'cache-api',
          plugins: [ 
            new workbox.cacheableResponse.Plugin({
                statuses: [200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }), 
        ]
      })
  );

  self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: '/icon.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });
  