process.on('message', function (msg) {
    
    console.dir('child =>', msg.hello);

    msg.hello = msg.hello.toUpperCase();
    process.send(msg);
});