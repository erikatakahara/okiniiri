define('app', ['doc'], function($) {
	var $app = $('#app');
	$app.on('load', function() {
		$app.addClass('loading');
	});

	$app.on('finishload', function() {
		$app.removeClass('loading');
	});
});