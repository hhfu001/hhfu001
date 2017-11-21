/*
    保证一个类仅有一个实例
*/

/*
    1. 不透明性，使用者不知道Singleton是个单例
*/
class Singleton { 

    constructor(name) { 
        this.name = name;
    }

    getName() {}
}
// 
Singleton.getInstance = (() => { 
    var instance = null;
    return (name) => {
        if (!instance) { 
            instance = new Singleton(name)
        }

        return instance;
    }
})()

const a = Singleton.getInstance('seven1')
const b = Singleton.getInstance('seven2')

console.log(a === b);

//2. 使用代理模式管理 一个透明的单例／
const ProxySingleTon = (() => {
    let instance;

    return  function(name) { 
        // (name) => {
        if (!instance) {
            instance = new Singleton(name)
        }
        return instance;
    // }
    }

})();


const c = new ProxySingleTon('seven3')
const d = new ProxySingleTon('seven4')

console.log(c === d)



/*
// 箭头函数无法做构造函数
const fn = (() => {
    return (a) => {
        console.log(a)
    }
})()

fn('testssss')
new fn('123')
*/

function getSingle(fn) {
    var result;

    return () => { 
        return result || (result = fn.apply(this, arguments))
    }
 }