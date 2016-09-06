define('toast', ['doc'], function($) {
	$('body').on('toast', function(e) {
		var $message = $(document.createElement('p'));
		console.log(e.detail);
		$message.addClass('toast').addClass(e.detail.type).html(e.detail.message);
		$('body').append($message.first());

		setTimeout(function() {
			$message.addClass('close');
		}, 100);
		setTimeout(function() {
			$message.removeItem();
		}, 3000);
	});
});