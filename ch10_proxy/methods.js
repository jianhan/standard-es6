// get()
// get 方法用于拦截某个属性的读取操作。上文已经有一个例子，下面是另一个拦
// 截读取操作的例子

var person = {
  name: "张三"
};
var proxy = new Proxy(person, {
  get: function(target, property) {
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

// get 方法可以继承。
let proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log('GET ' + propertyKey);
    return target[propertyKey];
  }
});
let obj = Object.create(proto);
obj.xxx // "GET xxx"
// 上面代码中，拦截操作定义在 Prototype 对象上面，所以如果读取 obj 对象继
// 承的属性时，拦截会生效

// 下面的例子使用 get 拦截，实现数组读取负数的索引
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
// 上面代码中，数组的位置参数是 -1 ，就会输出数组的倒数最后一个成员。
// 利用 Proxy，可以将读取属性的操作（get ） ，转变为执行某个函数，从而实现
// 属性的链式操作

// set()
// set 方法用来拦截某个属性的赋值操作。
// 假定 Person 对象有一个 age 属性，该属性应该是一个不大于200的整数，那么
// 可以使用 Proxy 保证 age 的属性值符合要求
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }
    // 对于age以外的属性，直接保存
    obj[prop] = value;
  }
};
let person = new Proxy({}, validator);
person.age = 100;
person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错
// 上面代码中，由于设置了存值函数 set ，任何不符合要求的 age 属性赋值，都会
// 抛出一个错误，这是数据验证的一种实现方法。利用 set 方法，还可以数据绑
// 定，即每当对象发生变化时，会自动更新 DOM

// 有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，表
// 示这些属性不应该被外部使用。结合 get 和 set 方法，就可以做到防止这些内部
// 属性被外部读写
var handler = {
  get(target, key) {
    invariant(key, 'get');
    return target[key];
  },
  set(target, key, value) {
    invariant(key, 'set');
    target[key] = value;
    return true;
  }
};

function invariant(key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}
" property`);
  }
}
var target = {};
var proxy = new Proxy(target, handler);
proxy._prop
// Error: Invalid attempt to get private "_prop" property
proxy._prop = 'c'
// Error: Invalid attempt to set private "_prop" property

// apply()
// apply 方法拦截函数的调用、 call 和 apply 操作。
// apply 方法可以接受三个参数，分别是目标对象、目标对象的上下文对象
// （this ） 和目标对象的参数数组
var target = function() {
  return 'I am the target';
};
var handler = {
  apply: function() {
    return 'I am the proxy';
  }
};
var p = new Proxy(target, handler);
p()
// // "I am the proxy"
var twice = {
  apply(target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  }
};

function sum(left, right) {
  return left + right;
};
var proxy = new Proxy(sum, twice);
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30

// 上面代码中，每当执行 proxy 函数（ 直接调用或 call 和 apply 调用） ，就会
// 被 apply 方法拦截。
// 另外，直接调用 Reflect.apply 方法，也会被拦截。
Reflect.apply(proxy, null, [9, 10]) // 38

// has()
// has 方法用来拦截 HasProperty 操作，即判断对象是否具有某个属性时，这个
// 方法会生效。典型的操作就是 in 运算符。
// 下面的例子使用 has 方法隐藏某些属性，不被 in 运算符发现。
var handler = {
  has(target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = {
  _prop: 'foo',
  prop: 'foo'
};
var proxy = new Proxy(target, handler);
'_prop' in proxy // false
// 上面代码中，如果原对象的属性名的第一个字符是下划线， proxy.has 就会返
// 回 false ，从而不会被 in 运算符发现。
// 如果原对象不可配置或者禁止扩展，这时 has 拦截会报错
