define(['doc', 'Handlebars', 'gists', 'app', 'connection'], function($, Handlebars, gists) {
	var listTemplate = Handlebars.compile($('#gists-list').html()),
		detailsTemplate = Handlebars.compile($('#gists-details').html()),
		$gists = $('#list'),
		$gistsDetails = $('#details'),
		$next = $('#next');

	$gists.on('gists-clear', function(e) {
		$gists.find('ul').html('');	
	});

	$gists.on('gists-render', function(e) {
		$gists.find('ul').first().insertAdjacentHTML('beforeend', listTemplate({
			gists: e.detail
		}));
		$gists.find('.item').on('click', function(e) {
			e.preventDefault();
			$.broadcast('gists-details', $(this).data('id'));			
		});
	});

	$gists.on('gists-load', function() {
		gists.list(function(response) {
			$gists.find('.item').off('click');
			if(response.keys()) {
				$.broadcast('gists-render', response);
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
			$gistsDetails.find('.favorite').on('click', function(e) {
				gists.favorite($(this).data('id'));
			});
		});
	});

	$gists.on('gists-details-close', function(e) {
		$gists.addClass('visible');
		$gistsDetails.removeClass('visible');
	});

	$('.okiniiri').on('click', function() {
		$.broadcast('gists-details-close');
		gists.favorites();
		$next.addClass('hide');
	});

	$.broadcast('gists-load');
	$next.on('click', function() {
		$.broadcast('gists-load');
	});
});