// Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一
// 种“元编程”（ meta programming） ，即对编程语言进行编程。

// Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必
// 须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写

var obj = new Proxy({}, {
  get: function(target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function(target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  }
});
// 上面代码对一个空对象架设了一层拦截，重定义了属性的读取（get ） 和设置
// （set ） 行为。这里暂时先不解释具体的语法，只看运行结果。对设置了拦截行
// 为的对象 obj ，去读写它的属性，就会得到下面的结果。
obj.count = 1
  // setting count!
  ++obj.count
// getting count!
// setting count!
// 2
// 上面代码说明，Proxy 实际上重载（ overload） 了点运算符，即用自己的定义覆盖了语言的原始定义
// ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。
var proxy = new Proxy(target, handler);
// Proxy 对象的所有用法，都是上面这种形式，不同的只是 handler 参数的写法。
// 其中， new Proxy() 表示生成一个 Proxy 实例， target 参数表示所要拦截的
// 目标对象， handler 参数也是一个对象，用来定制拦截行为。
// 下面是另一个拦截读取属性行为的例子。
var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});
proxy.time // 35
proxy.name // 35
proxy.title // 35

// 如果 handler 没有设置任何拦截，那就等同于直接通向原对象
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"

// 一个技巧是将 Proxy 对象，设置到 object.proxy 属性，从而可以在 object 对象上调用。
var object = {
  proxy: new Proxy(target, handler)
};

// Proxy 实例也可以作为其他对象的原型对象。
var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});
let obj = Object.create(proxy);
obj.time // 35

// 上面代码中， proxy 对象是 obj 对象的原型， obj 对象本身并没有 time 属
// 性，所以根据原型链，会在 proxy 对象上读取该属性，导致被拦截。
// 同一个拦截器函数，可以设置拦截多个操作

var handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },
  apply: function(target, thisBinding, args) {
    return args[0];
  },
  construct: function(target, args) {
    return {
      value: args[1]
    };
  }
};
var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);
fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo // "Hello, foo"
// 对于可以设置、但没有设置拦截的操作，则直接落在目标对象上，按照原先的方式产生结果
