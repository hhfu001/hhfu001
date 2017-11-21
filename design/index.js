/*
    职责链模式(chain of responsibility)
    使用多个对象都有机会处理请求。
    从而避免请求的发送者和接受者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止
*/


/*
    ordertype:1->500、2->300 \ 3->normal
    pay 是否已支付
    stock 库存 已支付不受库存限制
*/

var order500 = function (ordertype, pay, stock) {
    if (ordertype === 1 && pay === true) {
        console.log('500订金预购，享100元优惠')
    } else {
        return 'next'; // 同步传递
    }
}

var order200 = function (ordertype, pay, stock) {
    if (ordertype === 2 && pay === true) {
        console.log('200订金预购，享50元优惠')
    } else {

        var self = this;
        setTimeout(function () {  // 异步传递
            self.next && self.next(ordertype, pay, stock)
        }, 3000)

        return 'next'; // 同步传递
    }
}

var orderNormal = function (ordertype, pay, stock) {
    if (stock > 0) {
        console.log('普通用户、暂无优惠。')
    } else {
        console.log('库存不足')
    }
}

class Chain {
    constructor(fn) {
        this.fn = fn;
        this.successor = null;
    }
    setNextSuccessor(successor) {

        return this.successor = successor;
    }

    // 同步职责链
    passRequest() {
        let ret = this.fn.apply(this, arguments)

        if (ret === 'next') {
            return this.successor && this.successor.passRequest.apply(this.successor, arguments)
        }
    }

    // 异步职责链
    next() {
        return this.successor && this.successor.passRequest.apply(this.successor, arguments)
    }
}

// 制定职责链顺序
var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);

chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

// 把请求传递给第一个节点。
chainOrder500.passRequest(1, true, 500) // 500订金预购，享100元优惠
chainOrder500.passRequest(2, true, 500) // 200订金预购，享50元优惠
chainOrder500.passRequest(3, true, 500) // 普通用户、暂无优惠。
chainOrder500.passRequest(3, false, 0) // 库存不足



// AOP 实现职责链
Function.prototype.after = function (fn) {
    var self = this;

    return function () {
        var ret = self.apply(this, arguments);

        if (ret === 'next') {
            return fn.apply(this.arguments)
        }

        return ret;
    }
}

var order = order500.after(order200).after(orderNormal);

order(2, true, 0) ///