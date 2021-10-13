self.addEventListener('install', function(event) {
	event.waitUntil(
	caches.open('v1').then(function(cache) {
		return cache.addAll([
			'./',
			'./index.html',
			'./scan.html',
			'./css/style.css',
			'./css/bootstrap.min.css',
			'./js/instascan.min.js',
			'./js/html5-qrcode.min.js',
			'./fonts/Rubik-VariableFont_wght.ttf',
			'./img/disp_bottom.png',
			'./img/footer_bar.png',
			'./img/home_enter.jpg',
			'./img/icon_arrow_left.png',
			'./img/icon_arrow_right.png',
			'./img/icon_close.png',
			'./img/icons-192.png',
			'./img/icons-512.png',
			'./img/img_checkin_success.png',
			'./img/img_qr_code.png',
		]);
	})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(caches.match(event.request).then(function(response) {
	// caches.match() always resolves
	// but in case of success response will have value
	if (response !== undefined) {
		return response;
	} else {
		return fetch(event.request).then(function (response) {
		// response may be used only once
		// we need to save clone to put one copy in cache
		// and serve second one
		let responseClone = response.clone();
		
		caches.open('v1').then(function (cache) {
			cache.put(event.request, responseClone);
		});
		return response;
		}).catch(function () {
		return caches.match('./index.html');
		});
	}
	}));
});
