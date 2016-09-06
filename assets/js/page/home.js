define(['doc', 'Handlebars', 'gists', 'app'], function($, Handlebars, gists) {
	var source = $('#gists-template').html();
	var template = Handlebars.compile(source);
	var $gists = $('#gists'), $next = $('#next');

	$gists.on('gists-load', function() {
		gists.list(function(response) {
			if(response.keys()) {
				$gists.first().insertAdjacentHTML('beforeend', template({
					gists: response
				}));
			} else {
				$next.removeItem();			}

		});
	});

	$.broadcast('gists-load');
	$next.on('click', function() {
		$.broadcast('gists-load');
	});
});