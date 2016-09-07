define('gists', ['doc', 'app'], function($, app) {
	'use strict';

	var GIST_URL = 'https://api.github.com/gists/public',
		GIST_DETAILS_URL = 'https://api.github.com/gists/';
	var page = 0;

	return {
		list: function(successCallback) {
			app.ajax(GIST_URL, {
				truncated: true,
				page: ++page	
			}, successCallback);
		},

		details: function(id, successCallback) {
			app.ajax(GIST_DETAILS_URL + id, {}, successCallback);
		}
	}
});