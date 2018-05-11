// #1 combine array

// ES5
[1, 2].concat(more)
// ES6
[1, 2, ...more]

var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];
// ES5的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]
// ES6的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]

// #2 与解构赋值结合
// 扩展运算符可以与解构赋值结合起来，用于生成数组。
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list

const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest // [2, 3, 4, 5]
const [first, ...rest] = [];
first // undefined
rest // []
const [first, ...rest] = ["foo"];
first // "foo"
rest // []

// 如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错
const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错

// # 3） 函数的返回值
// JavaScript 的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象。
// 扩展运算符提供了解决这个问题的一种变通方法。
var dateFields = readDateFields(database);
var d = new Date(...dateFields);

// （ 4） 字符串
// 扩展运算符还可以将字符串转为真正的数组。
[...'hello']
// [ "h", "e", "l", "l", "o" ]

// （ 5） 实现了 Iterator 接口的对象
// 任何 Iterator 接口的对象（ 参阅 Iterator 一章） ，都可以用扩展运算符转为真正的
// 数组。
var nodeList = document.querySelectorAll('div');
var array = [...nodeList];

// （ 6） Map 和 Set 结构，Generator 函数
// 扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的
// 对象，都可以使用扩展运算符，比如 Map 结构。
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);
let arr = [...map.keys()]; // [1, 2, 3]

// Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符
var go = function*() {
  yield 1;
  yield 2;
  yield 3;
};
[...go()] // [1, 2, 3]
// 上面代码中，变量 go 是一个 Generator 函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组
