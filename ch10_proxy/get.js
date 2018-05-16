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

// 上面代码表示，如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个
// 拦截函数，访问不存在的属性，只会返回 undefined