if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/okiniiri/service.js')
		.then(function(registration) {
			console.log('registrado com sucesso sw');
		}).catch(function(){
			console.log('registrado com erro sw!');
		});
}
