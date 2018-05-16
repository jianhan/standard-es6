// get() get 方法用于拦截某个属性的读取操作。上文已经有一个例子，下面是另一个拦 截读取操作的例子

var person = {
    name: "张三"
};
var proxy = new Proxy(person, {
    get: function (target, property) {
        if (property in target) {
            return target[property];
        } else {
            throw new ReferenceError("Property \"" + property + "\" does not exist.");
        }
    }
});
proxy.name // "张三"
proxy.age // 抛出一个错误

// 上面代码表示，如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个 拦截函数，访问不存在的属性，只会返回 undefined get 方法可以继承。
let proto = new Proxy({}, {
    get(target, propertyKey, receiver) {
        console.log('GET ' + propertyKey);
        return target[propertyKey];
    }
});
let obj = Object.create(proto);
obj.xxx // "GET xxx"
// 上面代码中，拦截操作定义在 Prototype 对象上面，所以如果读取 obj 对象继 承的属性时，拦截会生效

function createArray(...elements) {
    let handler = {
        get(target, propKey, receiver) {
            let index = Number(propKey);
            if (index < 0) {
                propKey = String(target.length + index);
            }
            return Reflect.get(target, propKey, receiver);
        }
    };
    let target = [];
    target.push(...elements);
    return new Proxy(target, handler);
}
let arr = createArray('a', 'b', 'c');
arr[-1] // c
// 上面代码中，数组的位置参数是 -1 ，就会输出数组的倒数最后一个成员。 利用 Proxy，可以将读取属性的操作（get ）
// ，转变为执行某个函数，从而实现属性的链式操作
var pipe = (function () {
    return function (value) {
        var funcStack = [];
        var oproxy = new Proxy({}, {
            get: function (pipeObject, fnName) {
                if (fnName === 'get') {
                    return funcStack.reduce(function (val, fn) {
                        return fn(val);
                    }, value);
                }
                funcStack.push(window[fnName]);
                return oproxy;
            }
        });
        return oproxy;
    }
}());
var double = n => n * 2;
var pow = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("")
pipe(3).double.pow.reverseInt.get; // 63