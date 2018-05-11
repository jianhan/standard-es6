// ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）

let [a,
  b,
  c
] = [1, 2, 3]

let [foo, [
  [bar], baz
]] = [
  1, [
    [2], 3
  ]
];
foo // 1
bar // 2
baz // 3
let [, ,
  third
] = ["foo", "bar", "baz"];
third // "baz"
let [x, ,
  y
] = [1, 2, 3];
x // 1
y // 3
let [head,
  ...tail
] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]
let [x1,
  y1,
  ...z1
] = ['a'];
x1 // "a"
y1 // undefined
z1 // []
// 如果解构不成功，变量的值就等于 undefined 。
let [foo2] = [];
let [bar3,
  foo3
] = [1];

// partially deconstruct
let [x2,
  y2
] = [1, 2, 3];
x2 // 1
y2 // 2
let [a1, [b1],
  d1
] = [
  1, [
    2, 3
  ],
  4
];
a1 // 1
b1 // 2
d1 // 4

// 报错
// let [foo5] = 1;
// let [foo6] = false;
// let [foo7] = NaN;
// let [foo8] = undefined;
// let [foo9] = null;
// let [foo10] = {};

// 上面的语句都会报错，因为等号右边的值，要么转为对象以后不具备 Iterator 接口 （ 前五个表达式） ，要么本身就不具备 Iterator 接口（
// 最后一个表达式） 。 对于 Set 结构，也可以使用数组的解构赋值。
let [x6,
  y6,
  z6
] = new Set(['a', 'b', 'c']);
x6 // "a"

//事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值

// default value
let [fooo7 = true] = [];
fooo7 // true
let [x9, y9 = 'b'] = ['a']; // x='a', y='b'
let [x10, y10 = 'b'] = ['a', undefined]; // x='a', y='b'

// only undefined will trigger default value
let [x11 = 1] = [undefined];
x11 // 1
let [x12 = 1] = [null];
x12 // null

// 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由
// 它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的
// 值。
let {
  bar12,
  foo12
} = {
  foo12: "aaa",
  bar12: "bbb"
};
foo12 // "aaa"
bar12 // "bbb"
let {
  baz12
} = {
  foo: "aaa",
  bar: "bbb"
};
baz12 // undefined

// 如果变量名与属性名不一致，必须写成下面这样。
var {
  foo: baz13
} = {
  foo: 'aaa',
  bar13: 'bbb'
};
baz13 // "aaa"
let obj = {
  first: 'hello',
  last: 'world'
};
let {
  first: f,
  last: l
} = obj;
f // 'hello'
l // 'world

// 这实际上说明，对象的解构赋值是下面形式的简写（ 参见《 对象的扩展》 一章） 。
let {
  foo15: foo15,
  bar15: bar15
} = {
  foo15: "aaa",
  bar15: "bbb"
};
// 也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变
// 量。真正被赋值的是后者，而不是前者。
let {
  foo17: baz16
} = {
  foo17: "aaa",
  bar17: "bbb"
};
baz16 // "aaa"
// foo17 // error: foo is not defined
// 上面代码中， foo 是匹配的模式， baz 才是变量。真正被赋值的是变量 baz ，
// 而不是模式 foo

let obj1 = {
  p: [
    'Hello',
    {
      y: 'World'
    }
  ]
};
let {
  p: [x18, {
    y18
  }]
} = obj1;
x18 // "Hello"
y18 // "World"

// 注意，这时 p 是模式，不是变量，因此不会被赋值。如果 p 也要作为变量赋值，
// 可以写成下面这样。

let { p, p: [x20, { y: y19 }] } = obj1;
x20 // "Hello"
y19 // "World"
p // ["Hello", {y: "World"}]
console.log(x20,y19,p)

// 对象的解构也可以指定默认值

var {x21 = 3} = {};
x21 // 3
var {x22, y22 = 5} = {x22: 1};
x22 // 1
y22 // 5
var {x23: y23 = 3} = {};
y23 // 3
var {x24: y24 = 3} = {x24: 5};
y24 // 5
var { message: msg = 'Something went wrong' } = {};
console.log(msg) // "Something went wrong"

// 默认值生效的条件是，对象的属性值严格等于 undefined 。
var {x25 = 3} = {x25: undefined};
console.log(x25) // 3
var {x26 = 3} = {x26: null};
console.log(x26) // null

// 如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错
// 报错
let {foo27: {baz27}} = {foo27: {baz27: 'ba27'}};
console.log(baz27)
// 原因很简单，因为 foo 这时等于 undefined ，再取子属性就会报错，请看下面的代码
// let _tmp = {baz27: 'baz'};
// _tmp.foo27.bar27 // 报错

// 如果要将一个已经声明的变量用于解构赋值，必须非常小心

// 错误的写法

// let x;
// {x} = {x: 1};

// SyntaxError: syntax error

// 只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题
// 正确的写法
let x30 = "test";
({x30} = {x30: 1});
console.log(x30)

// 对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量
let { log, sin, cos } = Math;
// 上面代码将 Math 对象的对数、正弦、余弦三个方法，赋值到对应的变量上，使用起来就会方便很多

// 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构

let arr1 = [1, 2, 3];
let {0 : first, [arr1.length - 1] : last} = arr1;
console.log(first,last) // 1
