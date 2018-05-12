// 对象的每个属性都有一个描述对象（ Descriptor） ，用来控制该属性的行为。 Object.getOwnPropertyDescriptor 方法可以获取该属性的描述对象。
let obj = {
  foo: 123
};
Object.getOwnPropertyDescriptor(obj, 'foo')
// {
// value: 123,
// writable: true,
// enumerable: true,
// configurable: true
// }

// 描述对象的 enumerable 属性，称为”可枚举性“，如果该属性为 false ，就表示某些操作会忽略当前属性。
// 目前，有四个操作会忽略 enumerable 为 false 的属性。

// for...in 循环：只遍历对象自身的和继承的可枚举的属性。
// Object.keys() ：返回对象自身的所有可枚举的属性的键名。
// JSON.stringify() ：只串行化对象自身的可枚举的属性。
// Object.assign() ： 忽略 enumerable 为 false 的属性，只拷贝对象自
// 身的可枚举的属性。

// 这四个操作之中，前三个是 ES5 就有的，最后一个 Object.assign() 是 ES6 新
// 增的。其中，只有 for...in 会返回继承的属性，其他三个方法都会忽略继承的属
// 性，只处理对象自身的属性。实际上，引入“可枚举”（enumerable ） 这个概念的
// 最初目的，就是让某些属性可以规避掉 for...in 操作，不然所有内部属性和方法
// 都会被遍历到。比如，对象原型的 toString 方法，以及数组的 length 属性，
// 就通过“可枚举性”，从而避免被 for...in 遍历到

// 另外，ES6 规定，所有 Class 的原型的方法都是不可枚举的。
Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo'
).enumerable
// false

// 属性的遍历
// ES6 一共有5种方法可以遍历对象的属性。
// （ 1） for...in
// for...in 循环遍历对象自身的和继承的可枚举属性（ 不含 Symbol 属性） 。
// （ 2） Object.keys(obj)
// Object.keys 返回一个数组，包括对象自身的（ 不含继承的） 所有可枚举属性
// （ 不含 Symbol 属性） 。
// （ 3） Object.getOwnPropertyNames(obj)
// Object.getOwnPropertyNames 返回一个数组，包含对象自身的所有属性（ 不含
// Symbol 属性，但是包括不可枚举属性） 。
// （ 4） Object.getOwnPropertySymbols(obj)
// Object.getOwnPropertySymbols 返回一个数组，包含对象自身的所有 Symbol
// 属性。
// （ 5） Reflect.ownKeys(obj)
// Reflect.ownKeys 返回一个数组，包含对象自身的所有属性，不管属性名是
// Symbol 或字符串，也不管是否可枚举。
// 以上的5种方法遍历对象的属性，都遵守同样的属性遍历的次序规则。
// 对象的扩展
// 205
// 首先遍历所有属性名为数值的属性，按照数字排序。
// 其次遍历所有属性名为字符串的属性，按照生成时间排序。
// 最后遍历所有属性名为 Symbol 值的属性，按照生成时间排序。
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]
