// Array.from 方法用于将两类对象转为真正的数组：类似数组的对象（ array-likeobject） 和可遍历（ iterable） 的对象（ 包括ES6新增的数据结构Set和Map）

let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};
// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

// ###实际应用中，常见的类似数组的对象是DOM操作返回的NodeList集合，以及函数内部的 arguments 对象。 Array.from 都可以将它们转为真正的数组
// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).forEach(function(p) {
  console.log(p);
});
// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}

// 只要是部署了Iterator接口的数据结构， Array.from 都能将其转为数组
Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']

let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']

// 值得提醒的是，扩展运算符（... ） 也可以将某些数据结构转为数组

// // arguments对象
function foo() {
var args = [...arguments];
}
// NodeList对象
[...document.querySelectorAll('div')]
// 扩展运算符背后调用的是遍历器接口（Symbol.iterator ） ，如果一个对象没有
// 部署这个接口，就无法转换。 Array.from 方法还支持类似数组的对象。所谓类
// 似数组的对象，本质特征只有一点，即必须有 length 属性

// 任何有 length 属性的对象，都可以通过 Array.from 方法转为数组，而此时扩展运算符就无法转换。
Array.from({ length: 3 });
// [ undefined, undefined, undefined ]

// Array.from 还可以接受第二个参数，作用类似于数组的 map 方法，用来对每个
// 元素进行处理，将处理后的值放入返回的数组。
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);
Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]

// 下面的例子是取出一组DOM节点的文本内容。
let spans = document.querySelectorAll('span.name');
// map()
let names1 = Array.prototype.map.call(spans, s => s.textContent);
// Array.from()
let names2 = Array.from(spans, s => s.textContent)

// 下面的例子将数组中布尔值为 false 的成员转为 0 。
Array.from([1, , 2, , 3], (n) => n || 0)
// [1, 0, 2, 0, 3]
