// ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重
// 复的值。
// Set 本身是一个构造函数，用来生成 Set 数据结构。
const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
for (let i of s) {
  console.log(i);
}
// 2 3 5 4

// Set 函数可以接受一个数组（ 或者具有 iterable 接口的其他数据结构） 作为参数，用来初始化

// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]
// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5
// 例三
function divs() {
  return [...document.querySelectorAll('div')];
}
const set = new Set(divs());
set.size // 56
// 类似于
divs().forEach(div => set.add(div));
set.size // 56
// 上面代码中，例一和例二都是 Set 函数接受数组作为参数，例三是接受类似数组
// 的对象作为参数。
// 上面代码中，也展示了一种去除数组重复成员的方法。
// 去除数组的重复成员
[...new Set(array)]

// 另外，两个对象总是不相等的。
let set = new Set();
set.add({});
set.size // 1
set.add({});
set.size // 2

// Set 实例的属性和方法
// Set 结构的实例有以下属性。
// Set.prototype.constructor ：构造函数，默认就是 Set 函数。
// Set.prototype.size ：返回 Set 实例的成员总数。
// Set 实例的方法分为两大类：操作方法（ 用于操作数据） 和遍历方法（ 用于遍历成
// 员） 。下面先介绍四个操作方法。
add(value) //：添加某个值，返回Set结构本身。
delete(value) //：删除某个值，返回一个布尔值，表示删除是否成功。
has(value) //：返回一个布尔值，表示该值是否为 Set 的成员。
clear() //：清除所有成员，没有返回值

s.add(1).add(2).add(2);
// 注意2被加入了两次
s.size // 2
s.has(1) // true
s.has(2) // true
s.has(3) // false
s.delete(2);
s.has(2) // false
// 下面是一个对比，看看在判断是否包括一个键上面， Object 结构和 Set 结构的
// 写法不同。
// 对象的写法
const properties = {
  'width': 1,
  'height': 1
};
if (properties[someName]) {
  // do something
}
// Set的写法
const properties = new Set();
properties.add('width');
properties.add('height');
if (properties.has(someName)) {
  // do something
}

// Array.from 方法可以将 Set 结构转为数组。
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);
// 这就提供了去除数组重复成员的另一种方法。
function dedupe(array) {
  return Array.from(new Set(array));
}
dedupe([1, 1, 2, 3]) // [1, 2, 3]
