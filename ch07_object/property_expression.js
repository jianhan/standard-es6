// JavaScript 定义对象的属性，有两种方法。
// 方法一
obj.foo = true;
// 方法二
obj['a' + 'bc'] = 123;

// 但是，如果使用字面量方式定义对象（ 使用大括号） ，在 ES5 中只能使用方法一（ 标识符） 定义属性。
var obj = {
  foo: true,
  abc: 123
};
// ES6 允许字面量定义对象时，用方法二（ 表达式） 作为对象的属性名，即把表达式
// 放在方括号内。
let propKey = 'foo';
let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
};

// 下面是另一个例子
var lastWord = 'last word';
var a = {
  'first word': 'hello',
  [lastWord]: 'world'
};
a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"

// 表达式还可以用于定义方法名。
let obj = {
  ['h' + 'ello']() {
    return 'hi';
  }
};
obj.hello() // hi

// 注意，属性名表达式与简洁表示法，不能同时使用，会报错。
// 报错
var foo = 'bar';
var bar = 'abc';
var baz = {
  [foo]
};
// 正确
var foo = 'bar';
var baz = {
  [foo]: 'abc'
};

// 注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串 [object Object] ，这一点要特别小心
const keyA = {
  a: 1
};
const keyB = {
  b: 2
};
const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
};
myObject // Object {[object Object]: "valueB"}
// 上面代码中， [keyA] 和 [keyB] 得到的都是 [object Object] ，所
// 以 [keyB] 会把 [keyA] 覆盖掉，而 myObject 最后只有一个 [object
// Object] 属性
