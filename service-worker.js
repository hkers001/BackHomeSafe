self.addEventListener('install', function(event) {
    self.skipWaiting();
    
    var offlinePage = new Request('index.html');
    event.waitUntil(
    fetch(offlinePage).then(function(response) {
      return caches.open('offline2').then(function(cache) {
        return cache.put(offlinePage, response);
      });
    }));
  }); self.addEventListener('fetch', function(event) {
    event.respondWith(
      fetch(event.request).catch(function(error) {
          return caches.open('offline2').then(function(cache) {
            return cache.match('index.html');
        });
      }));
  }); self.addEventListener('refreshOffline', function(response) {
    return caches.open('offline2').then(function(cache) {
      return cache.put(offlinePage, response);
    });
  }); self.addEventListener('push', function (event) {
    var data = event.data.json();   var opts = {
      body: data.body,
      icon: data.icon,
      data: {
        url: data.url
      }
    };
    event.waitUntil(self.registration.showNotification(data.title, opts));
  }); self.addEventListener('notificationclick', function(event) {
    var data = event.notification.data;   event.notification.close();   event.waitUntil(
      clients.openWindow(data.url)
    );
  });

  self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        './index.html',
        './scan.html',
        './css/style.css',
        './css/bootstrap.min.css',
        './js/html5-qrcode.min.js',
        './img/disp_bottom.png',
        './img/footer_bar.png',
        './img/home_enter.jpg',
        './img/icon_arrow_left.png',
        './img/icon_arrow_right.png',
        './img/icon_close.png',
        './img/icons-192.png',
        './img/icons-512.png',
        './img/img_checkin_success.png',
      ]);
    })
  );
});