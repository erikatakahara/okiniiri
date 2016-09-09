define('app', ['doc', 'ajax'], function($, ajax) {
	var $app = $('#app');
	$app.on('load', function() {
		$app.addClass('loading');
	});

	$app.on('finishload', function() {
		$app.removeClass('loading');
	});

	return {
		ajax: function(url, data, successCallback, errorCallback) {
			$.broadcast('load');
			ajax.get(url, data, {
				success: function(response) {
					successCallback(response);
				},
				error: function(err, req) {
					if(req.status === 403) {
						$.broadcast('toast', {
							type: 'error',
							message: 'API rate limit exceeded'
						});
					} else {
						$.broadcast('toast', {
							type: 'error',
							message: 'An error ocurred trying to list gists'
						});
					}
					errorCallback && errorCallback();
				},
				complete: function() {
					$.broadcast('finishload');
				}
			}, {
				async: true,
				cache: true
			});
		}
	}
});