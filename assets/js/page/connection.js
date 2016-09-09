define('connection', ['doc', 'idb'], function($, idb) {

	$(window).on('online', function() {
		$('#app').removeClass('offline');
		$.broadcast('toast', {
			type: 'info',
			message: 'You are now online!'
		});
		$('.item.cached').removeClass('cached');
	});

	$(window).on('offline', function() {
		$.broadcast('toast', {
			type: 'info',
			message: 'You are now offline'
		});
		$('#app').addClass('offline');
		$.broadcast('cache');
	});

	$(window).on('cache', function() {
		idb.keys().then(function(ids) {
			for(var i = 0; i < ids.length; i++) {
				$('.item[data-id="' + ids[i] + '"]').addClass('cached');
			}
		});
	});
});