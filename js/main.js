(function(doc, win){

	/***************************************
	 * [TAIL test]
	 **************************************/
	œ.tail( function(){
				console.log('end 1');
	});

	for( var i = 0; i < 100 ; i++){
			console.log('start');
	}

	œ.tail( function(){
				console.log('end 2');
	});

	console.log('middle');

	/***************************************
	 * [DEBOUNCE test]
	 **************************************/
	var oInput = doc.getElementById('clavier');
	oInput.addEventListener( 'keyup', œ.debounce(function( e){

			if(this.value.length > 2){
				console.log(this.value);
			}

	}, 200));


	/***************************************
	 * [TROTTLE test]
	 **************************************/
	window.addEventListener( 'resize', œ.trottle(function( e){
			console.log('resize');
	}, 1000));



	/***************************************
	 * [EXPIRE test]
	 **************************************/
	setTimeout( œ.expire([
		function(){

			console.log( 'commencé');

	},function(){

			console.log( 'annulé');

	}], 500), 1000);



})( document, window);
