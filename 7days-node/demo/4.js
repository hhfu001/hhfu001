function sync(fn) {
    return fn();
}

try {
    sync(null);
    // Do something.
} catch (err) {
    console.log('Error: %s', err.message);
}

function async(fn, callback) {
    // Code execution path breaks here.
    setTimeout(function () {
        callback(fn());
    }, 0);
}

try {
    // async 无法捕获
    async(null, function (data) {
        // Do something.
    });
} catch (err) {
    console.log('Error2: %s', err.message);
}

// 捕获全局 异常
process.on('uncaughtException', function (err) {
    console.log('uncaughtException Error: %s', err.message);
});


function async2(fn, callback) {
    // Code execution path breaks here.
    setTimeout(function () 　{
        try {
            callback(null, fn());
        } catch (err) {
            callback(err);
        }
    }, 0);
}

async2(null, function (err, data) {
    if (err) {
        console.log('Error: %s', err.message);
    } else {
        // Do something.
    }
});