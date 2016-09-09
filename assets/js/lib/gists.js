define('gists', ['doc', 'app', 'idb'], function($, app, idb) {
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
			app.ajax(GIST_DETAILS_URL + id, {}, function(response) {
				successCallback(response);
			}, function() {
				$.broadcast('gists-details-close');
			});
		},

		favorite: function(id) {
			app.ajax(GIST_DETAILS_URL + id, {}, function(response) {
				idb.set(id, response).then(function() {
					$.broadcast('toast', {
						type: 'info',
						message: 'Favorited!'
					});	
				});
			});
		},

		unfavorite: function(id) {
			idb.delete(id).then(function() {
				$.broadcast('toast', {
					type: 'info',
					message: 'Unfavorited'
				});
			});
		},

		favorites: function() {
			$.broadcast('gists-clear');
			idb.keys().then(function(ids) {
				for(var i = 0; i < ids.length; i++) {
					idb.get(ids[i]).then(function(value) {
						$.broadcast('gists-render', [value]);
					});
				}
			});
		}
	}
});