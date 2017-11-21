Function.prototype.before = function (beforeFn) { 
    var self = this;

    return function () { 
        beforeFn.apply(this, arguments)

        return self.apply(this, arguments);
    }

}

var func = function (params) { 
    console.log(params)
}

func = func.before(function (params) { 
    params.b = 'b'
})

func({a: 'a'})