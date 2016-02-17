var child_process = require('child_process');

process.on('message', function(msg){
	msg.hello = msg.hello.toUpperCase();
    process.send(msg);
    console.log('child'+msg);
})