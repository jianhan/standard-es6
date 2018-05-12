// 基本用法
// Object.assign 方法用于对象的合并，将源对象（ source） 的所有可枚举属性，
// 复制到目标对象（ target） 。
var target = {
  a: 1
};
var source1 = {
  b: 2
};
var source2 = {
  c: 3
};
Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}

// Object.assign 方法的第一个参数是目标对象，后面的参数都是源对象。
// 注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属
// 性会覆盖前面的属性
var target = {
  a: 1,
  b: 1
};
var source1 = {
  b: 2,
  c: 2
};
var source2 = {
  c: 3
};
Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}

// 如果只有一个参数， Object.assign 会直接返回该参数。
var obj = {
  a: 1
};
Object.assign(obj) === obj // true

// 如果该参数不是对象，则会先转成对象，然后返回。
typeof Object.assign(2) // "object"
// 由于 undefined 和 null 无法转成对象，所以如果它们作为参数，就会报错。
Object.assign(undefined) // 报错
Object.assign(null) // 报错

// 如果非对象参数出现在源对象的位置（ 即非首参数） ，那么处理规则有所不同。首
// 先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如
// 果 undefined 和 null 不在首参数，就不会报错。
let obj = {
  a: 1
};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true
// 其他类型的值（ 即数值、字符串和布尔值） 不在首参数，也不会报错。但是，除了
// 字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果

var v1 = 'abc';
var v2 = true;
var v3 = 10;
var obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
// 上面代码中， v1 、 v2 、 v3 分别是字符串、布尔值和数值，结果只有字符串
// 合入目标对象（ 以字符数组的形式） ，数值和布尔值都会被忽略。这是因为只有字
// 符串的包装对象，会产生可枚举属性。

Object(true) // {[[PrimitiveValue]]: true}
Object(10) // {[[PrimitiveValue]]: 10}
Object('abc') // {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}
// 上面代码中，布尔值、数值、字符串分别转成对应的包装对象，可以看到它们的原
// 始值都在包装对象的内部属性 [[PrimitiveValue]] 上面，这个属性是不会
// 被 Object.assign 拷贝的。只有字符串的包装对象，会产生可枚举的实义属性，
// 那些属性则会被拷贝。

// Object.assign 拷贝的属性是有限制的，只拷贝源对象的自身属性（ 不拷贝继承
// 属性） ，也不拷贝不可枚举的属性（enumerable: false ） 。
Object.assign({
    b: 'c'
  },
  Object.defineProperty({}, 'invisible', {
    enumerable: false,
    value: 'hello'
  })
)
// { b: 'c' }

// 上面代码中，源对象 obj1 的 a 属性的值是一个对象， Object.assign 拷贝得
// 到的是这个对象的引用。这个对象的任何变化，都会反映到目标对象上面。
// 对于这种嵌套的对象，一旦遇到同名属性， Object.assign 的处理方法是替换，
// 而不是添加。
var target = { a: { b: 'c', d: 'e' } }
var source = { a: { b: 'hello' } }
Object.assign(target, source)
// { a: { b: 'hello' } }
// 上面代码中， target 对象的 a 属性被 source 对象的 a 属性整个替换掉了，
// 而不会得到 { a: { b: 'hello', d: 'e' } } 的结果。这通常不是开发者想要
// 的，需要特别小心

// 注意， Object.assign 可以用来处理数组，但是会把数组视为对象。
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
