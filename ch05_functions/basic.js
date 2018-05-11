// ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面
function log(x, y = 'World') {
  console.log(x, y);
}
log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello

function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}
var p = new Point();
p // { x: 0, y: 0 }

// 一个容易忽略的地方是，参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的
let x = 99;

function foo(p = x + 1) {
  console.log(p);
}
foo() // 100
x = 100;
foo() // 101

// 与解构赋值默认值结合使用
function foo({
  x,
  y = 5
}) {
  console.log(x, y);
}
foo({}) // undefined 5
foo({
  x: 1
}) // 1 5
foo({
  x: 1,
  y: 2
}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined

// 如果函数 foo 调用时没提供参数，变量 x 和 y 就不会生成，从而报错。通过提供函数参数的默认值，就可以避免这种情况
function foo({
  x,
  y = 5
} = {}) {
  console.log(x, y);
}
foo() // undefined 5

// 下面是另一个解构赋值默认值的例子
function fetch(url, {
  body = '',
  method = 'GET',
  headers = {}
}) {
  console.log(method);
}
fetch('http://example.com', {})
// "GET"
fetch('http://example.com')
// 报错

// 写法一
function m1({
  x = 0,
  y = 0
} = {}) {
  return [x, y];
}
//  写法二
function m2({
  x,
  y
} = {
  x: 0,
  y: 0
}) {
  return [x, y];
}

// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]
// x 和 y 都有值的情况
m1({
  x: 3,
  y: 8
}) // [3, 8]
m2({
  x: 3,
  y: 8
}) // [3, 8]
// x 有值，y 无值的情况
m1({
  x: 3
}) // [3, 0]
m2({
  x: 3
}) // [3, undefined]
// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]
m1({
  z: 3
}) // [0, 0]
m2({
  z: 3
}) // [undefined, undefined]

// 参数默认值的位置通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出
// 来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的
// 例一
function f(x = 1, y) {
  return [x, y];
}
f() // [1, undefined]
f(2) // [2, undefined])
f(, 1) // 报错
f(undefined, 1) // [1, 1]
// 例二
function f(x, y = 5, z) {
  return [x, y, z];
}
f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, , 2) // 报错
f(1, undefined, 2) // [1, 5, 2]

// 指定了默认值以后，函数的 length 属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后， length 属性将失真
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
// 上面代码中， length 属性的返回值，等于函数的参数个数减去指定了默认值的参数个数

// 如果设置了默认值的参数不是尾参数，那么 length 属性也不再计入后面的参数了。
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1
