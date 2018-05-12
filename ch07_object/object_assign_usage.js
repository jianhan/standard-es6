// 常见用途
// Object.assign 方法有很多用处。
// （ 1） 为对象添加属性
class Point {
  constructor(x, y) {
    Object.assign(this, {
      x,
      y
    });
  }
}
// 上面方法通过 Object.assign 方法，将 x 属性和 y 属性添加到 Point 类的对象实例

// （ 2） 为对象添加方法
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {···},
  anotherMethod() {···}
});
// 等同于下面的写法
SomeClass.prototype.someMethod = function(arg1, arg2) {···};
SomeClass.prototype.anotherMethod = function() {···};
// 上面代码使用了对象属性的简洁表示法，直接将两个函数放在大括号中，再使用 assign 方法添加到 SomeClass.prototype 之中

// （ 3） 克隆对象
function clone(origin) {
  return Object.assign({}, origin);
}
// 上面代码将原始对象拷贝到一个空对象，就得到了原始对象的克隆。
// 不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如
// 果想要保持继承链，可以采用下面的代码。
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}

//  4） 合并多个对象
// 将多个对象合并到某个对象。
const merge = (target, ...sources) => Object.assign(target, ...sources);
// 如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并。
const merge = (...sources) => Object.assign({}, ...sources);

// （ 5） 为属性指定默认值
const DEFAULTS = {
  logLevel: 0,
  outputFormat: 'html'
};

function processContent(options) {
  options = Object.assign({}, DEFAULTS, options);
  console.log(options);
  // ...
}
// 上面代码中， DEFAULTS 对象是默认值， options 对象是用户提供的参
// 数。 Object.assign 方法将 DEFAULTS 和 options 合并成一个新对象，如果两
// 者有同名属性，则 option 的属性值会覆盖 DEFAULTS 的属性值。
// 注意，由于存在浅拷贝的问题， DEFAULTS 对象和 options 对象的所有属性的
// 值，最好都是简单类型，不要指向另一个对象。否则， DEFAULTS 对象的该属性很
// 可能不起作用

const DEFAULTS = {
  url: {
    host: 'example.com',
    port: 7070
  },
};
processContent({
  url: {
    port: 8000
  }
})
// {
// url: {port: 8000}
// }
// 上面代码的原意是将 url.port 改成8000， url.host 不变。实际结果却
// 是 options.url 覆盖掉 DEFAULTS.url ，所以 url.host 就不存在了
