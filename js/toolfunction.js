(function( doc, win){


	var ToolFunction = function(){

			var oFunctions = {
					trottle  : trottle,
					debounce : debounce,
					expire   : expire,
					tail     : tail
			};

			/**
			 * [trottle : lancé toutes les X secondes max]
			 * @return {[type]} [description]
			 */
			function trottle( fn, iDelay){
				var iLast, oTimer;

				return function(){
						var iNow = +new Date(),
								args = arguments,
								self = this;

						if( iLast && iNow < iLast + iDelay){

								if( oTimer){
									clearTimeout( oTimer);
								}

								oTimer = setTimeout(function(){
										fn.apply( self, args);
										iLast = iNow;
								}, iDelay);

						}else{
								fn.apply( self, args);
						}
				};
			}

			/**
			 * [debounce : lancé une fois la derniere action faite dasn le temps imparti ]
			 * @return {[type]} [description]
			 */
			function debounce( fn, iDelay){

					var oTimer = null;

					return function(){

							var self = this,
									args = arguments;

							if( oTimer){
								clearTimeout( oTimer);
							}

							oTimer = setTimeout(function(){
								fn.apply( self, args);
							}, iDelay);
					};

			}

			/**
			 * [expire description]
			 * @return {[type]} [description]
			 */
			function expire( fn, iDelay, fnError){
				var _fnError, _fn;

				if( Object.prototype.toString.call(fn) === '[object Array]'){
					if( fn.length == 2 ){
						_fn      = fn[0];
						_fnError = fn[1];
					}else{
						_fnError = _fn = fn[0];
					}
				}else{
					_fnError = _fn = fn;
				}

				var oTime    = setTimeout( function(){
									oTime = null;
									_fnError();
						}, iDelay);

				return function(){
						if( oTime){
								clearTimeout( oTime);
								_fn.apply( this, arguments);
						}
				};

			}

			/**
			 * [tail description]
			 * @return {[type]} [description]
			 */
			function tail( fn){

				var save_fn = fn,
						oTimer  = setTimeout( function(){
								oTimer = null;
								if( fn){
										fn();
								}
						}, 0);

				return function(){

						if( oTimer){
								fn = save_fn.bind.apply(
										save_fn,
										[ this ].concat(
												[].slice.call( arguments)
										)
								);

						}else{
								save_fn.apply( this, arguments);
						}
				};
			}




			return oFunctions;
	};



	win.œ = new ToolFunction();

})( document, window);
