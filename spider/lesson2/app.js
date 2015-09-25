var express = require('express');

var utility = require('utility');

var app = express();

app.get('/', function(req, res){

console.log(req.query)
	var md5value;
	
	if(req.query.q){
		var q = req.query.q;

		md5value = utility.md5(q);
	}

	

	res.send(md5value)


});

app.listen('3000', function(){
	console.log('3000');
});