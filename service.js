const CACHE_VERSION = 'v1';

var URLS_TO_CACHE = [
	'/okiniiri',
	'assets/js/vendor/async-define.js',
	'assets/js/vendor/handlebars-v4.0.5.js',
	'assets/js/vendor/idb-keyval-min.js',
	'assets/js/vendor/ajax.js',
	'assets/js/vendor/doc.js',
	'assets/js/vendor/events-amd.js',
	'assets/js/lib/gists.js',
	'assets/js/lib/toast.js',
	'assets/js/lib/app.js',
	'assets/js/lib/sw.js',
	'assets/js/page/main.js',
	'assets/js/page/connection.js',
	'assets/css/reset.css',
	'assets/css/base.css',
	'https://fonts.googleapis.com/css?family=Delius'
];

self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open(CACHE_VERSION).then(function(cache) {
			return cache.addAll(URLS_TO_CACHE);
		})
	);
});

self.addEventListener('fetch', function(e) {
	if(e.request.url.indexOf('githubusercontent.com') != -1 || e.request.url.indexOf('api.github.com/gists/public') != -1) {
		e.respondWith(fetch(e.request)
			.then(response => {
				return caches.open(CACHE_VERSION).then(cache => {
					cache.put(e.request, response.clone());
					return response;
				});
			})
			.catch(error => {
				return caches.match(e.request);
			})
		);
	} else {
		e.respondWith(
			fetch(e.request).then(function(response) {
				return response;
			}).catch(function() {
				return caches.match(e.request)
					.then(function(response) {
						return response;
					})
			})
		);
	}

});