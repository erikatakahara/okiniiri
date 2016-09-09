define(['doc', 'Handlebars', 'gists', 'app'], function($, Handlebars, gists) {
	var listTemplate = Handlebars.compile($('#gists-list').html()),
		detailsTemplate = Handlebars.compile($('#gists-details').html()),
		$gists = $('#list'),
		$gistsDetails = $('#details'),
		$next = $('#next');

	$gists.on('gists-load', function() {
		gists.list(function(response) {
			$gists.find('.item').off('click');
			if(response.keys()) {
				$gists.find('ul').first().insertAdjacentHTML('beforeend', listTemplate({
					gists: response
				}));
				$gists.find('.item').on('click', function(e) {
					e.preventDefault();
					$.broadcast('gists-details', $(this).data('id'));			
				});
			} else {
				$next.removeItem();
			}
		});
	});

	$gists.on('gists-details', function(e) {
		$gistsDetails.addClass('visible');
		$gists.removeClass('visible');

		gists.details(e.detail, function(response) {
			$gistsDetails.html(detailsTemplate(response));

			$gistsDetails.find('.close').on('click', function(e) {
				e.preventDefault();
				$.broadcast('gists-details-close');	
			});
		});
	});

	$gists.on('gists-details-close', function(e) {
		$gists.addClass('visible');
		$gistsDetails.removeClass('visible');

		setTimeout(function() {
			$gistsDetails.html('');
		}, 1300);
	});

	$.broadcast('gists-load');
	$next.on('click', function() {
		$.broadcast('gists-load');
	});
});