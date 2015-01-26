(function(G){
	//ADS命名空间
	var ADS = {};

	ADS.isCompatible = function(other){
		//使用能力检测来检查必要条件
		if(other === false || !Array.prototype.push || !Object.hasOwnProperty || !document.createElement || !document.getElementByTagName){
			return false;
		}
		return true;
	}


	ADS.$ = function(){
		var elements = [];


		for(var i = 0, l = arguments.length; i < l; i++){
			var element = arguments[i];
			if(typeof element === 'string'){
				element = document.getElementById(element);
			}

			if(l === 1){
				return element;
			}

			elements.push(element);
		}

		return elements;
	}




	G.ADS = ADS;
})(window)