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
		},

		formatJs: function(response, callback) {
			var url; 
			if(response.owner) {
				url = 'https://gist.github.com/' + response.owner.login + '/' + response.id + '.js';
			} else {
				url = 'https://gist.github.com/' + response.id + '.js';
			}
			app.ajax(url, {}, function(response) {
				var matches = response.match(/document\.write\('(.*)'\)/g);
				var linkReg = /href="(.*)"/g,
					codeReg = /document\.write\('(.*)'\)/;

				var $link = $(document.createElement('link'));
				$link.attr('href', linkReg.exec(matches[0])[1]);
				$link.attr('rel', 'stylesheet');

				callback({
					style : $link.first(),
					code : codeReg.exec(matches[1])[1]
				});
			});
		}
	}
});