// 简易版vue https://github.com/georgebbbb/fakeVue
class Vue {

    constructor(options) {

        this.$options = options;
        this._data = options.data;

        Object.keys(options.data).forEach(key => this._proxy(key)); // 绑定数据到当前实例上 eg vm.a

        observer(options.data);

        const vdom = watch(this, this._render.bind(this), this._update.bind(this));

        console.log(vdom);

    }

    _update() {

        console.log("updating.....");

        const vdom = this._render.call(this);

        console.log(vdom);

    }

    _proxy(key) {
        const self = this;
        Object.defineProperty(self, key, {
            configurable: true,
            enumerable: true,
            get() {
                return self._data[key]
            },
            set(val) {
                self._data.text = val;
            }
        })

    }


    _render() {
        return this.$options.render.call(this)
    }

    __h__(tag, attr, children) {
        return VNode(tag, attr, children.map((child) => {
            if (typeof child === 'string') {
                return VNode(undefined, undefined, undefined, child)
            } else {
                return child
            }
        }))
    }

    __toString__(val) {
        return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val);
    }
}

function VNode(tag, data, children, text) {
    return {
        tag,
        data,
        children,
        text
    }

}

function observer(value, cb) {
    Object.keys(value).forEach((key) => {
        defineReactive(value, key, value[key], cb)
    })
}

function defineReactive(obj, key, val, cb) {
    const dep = new Dep(); // 添加数据监听依赖，不是所有数据变化都要update

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: () => {
            if (Dep.target) { // 收集依赖
                dep.add(Dep.target) 
            }
            return val;
        },
        set: newVal => {
            if (newVal === val) {
                return
            }

            val = newVal;

            dep.notify();

        }
    })
}

function watch(vm, exp, cb) {
    Dep.target = cb;

    return exp();
}

class Dep {
    constructor() {
        this.subs = [];
    }

    add(cb) {
        this.subs.push(cb);
    }

    notify() {
        this.subs.forEach(cb => cb());
    }
}

Dep.target = null; //记录是普通get还是 依赖性的get




// test

var demo = new Vue({
    el: '#demo',
    data: {
        text: "before",
    },
    render() {
        return this.__h__('div', {}, [
            this.__h__('span', {}, [this.__toString__(this.text)])
        ])
    }
})


setTimeout(function () {
    demo.text = "after"
}, 3000)