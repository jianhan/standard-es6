// 函数的 name 属性，返回函数名。对象方法也是函数，因此也有 name 属性。

const person = {
  sayName() {
    console.log('hello!');
  },
};
person.sayName.name // "sayName"

// 如果对象的方法使用了取值函数（getter ） 和存值函数（setter ） ，则 name 属性不是在该方法上面，而是该方法的属性的描述对象的 get 和 set 属性上面，返回值是方法名前加上 get 和 set
const obj = {
  get foo() {},
  set foo(x) {}
};
obj.foo.name
// TypeError: Cannot read property 'name' of undefined
const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');
descriptor.get.name // "get foo"
descriptor.set.name // "set foo"

// 有两种特殊情况： bind 方法创造的函数， name 属性返回 bound 加上原函数的
// 名字； Function 构造函数创造的函数， name 属性返回 anonymous 。
(new Function()).name // "anonymous"
var doSomething = function() {
  // ...
};
doSomething.bind().name // "bound doSomething"

// 如果对象的方法是一个 Symbol 值，那么 name 属性返回的是这个 Symbol 值的描述。
const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
  [key1]() {},
  [key2]() {},
};
obj[key1].name // "[description]"
obj[key2].name // ""
// 上面代码中， key1 对应的 Symbol 值有描述， key2 没有
