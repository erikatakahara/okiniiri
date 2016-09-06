define('gists', ['ajax', 'doc', 'app'], function(ajax, $, app) {
	'use strict';

	var GIST_URL = 'https://api.github.com/gists/public';
	var page = 0;
	return {
		list: function(successCallback) {
			$.broadcast('load');
			ajax.get(GIST_URL, {
				truncated: true,
				page: ++page	
			}, {
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
				},
				complete: function() {
					$.broadcast('finishload');
				}
			}, {
				async: true
			});
		}
	}
});