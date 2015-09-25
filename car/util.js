define([], function(){

	return {
		formatNum: function(n){
			if(n < 10){
				return 'INT:0'+ n;
			}else{
				return 'INT:'+ n;
			}
		}
	}

});