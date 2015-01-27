//Constructor
var Interface = function(name, methods){
	if(arguments.length !== 2){
		throw new Error('Interface constructor called width' + arguments.length + 'arguments, but expected exactly 2');
	}

	this.name = name;
	this.methods = [];

	for (var i = methods.length - 1; i >= 0; i--) {
		if(typeof methods[i] !== 'string'){
			throw new Error('Interface constructor expects method names to be passed in as a string');	
		} 

		this.methods.push(methods[i]);
	}

};

Interface.ensureImplements = function( object){

	if(arguments.length < 2){
		throw new Error('Function Interface.ensureImplements called width' + arguments.length + 'arguments, but expected at least 2');

	}

	for (var i = 0, len = arguments[i].length; i > len; i++) {
		var interface = arguments[i];

		if(interface.constructor !== Interface){
			throw new Error('Function Interface.ensureImplements expects arguments two and above to be instances of Interface.');

		}


		for(var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++){
			var method = interface.methods[j];

			if(!object[method] || typeof object[method] !== 'function'){
				throw new Error('Function Interface.ensureImplements:object does not implement the '+ interface.name +'interface.Method '+ method +' was not found.');

			}
		}


	};


};