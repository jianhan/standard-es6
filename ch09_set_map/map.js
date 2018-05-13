// JavaScript 的对象（ Object） ，本质上是键值对的集合（ Hash 结构） ，但是传统
// 上只能用字符串当作键。这给它的使用带来了很大的限制。
const data = {};
const element = document.getElementById('myDiv');
data[element] = 'metadata';
data['[object HTMLDivElement]'] // "metadata"
// 上面代码原意是将一个 DOM 节点作为对象 data 的键，但是由于对象只接受字符
// 串作为键名，所以 element 被自动转为字符串 [object HTMLDivElement]   //

// 为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集
// 合，但是“键”的范围不限于字符串，各种类型的值（ 包括对象） 都可以当作键。也
// 就是说，Object 结构提供了“字符串—值”的对应，Map结构提供了“值—值”的对
// 应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比Object 更合适

// const m = new Map();
const o = {
  p: 'Hello World'
};
m.set(o, 'content')
m.get(o) // "content"
m.has(o) // true
m.delete(o) // true
m.has(o) // false
// 上面代码使用 Map 结构的 set 方法，将对象 o 当作 m 的一个键，然后又使
// 用 get 方法读取这个键，接着使用 delete 方法删除了这个键。

// 上面的例子展示了如何向 Map 添加成员。作为构造函数，Map 也可以接受一个数
// 组作为参数。该数组的成员是一个个表示键值对的数组。
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);
map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
// 上面代码在新建 Map 实例时，就指定了两个键 name 和 title

// 事实上，不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数
// 组的数据结构（ 详见《 Iterator》 一章） 都可以当作 Map 构造函数的参数。这就是
// 说， Set 和 Map 都可以用来生成新的 Map
const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1
const m2 = new Map([
  ['baz', 3]
]);
const m3 = new Map(m2);
m3.get('baz') // 3

// 注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。
const map = new Map();
map.set(['a'], 555);
map.get(['a']) // undefined

// 如果 Map 的键是一个简单类型的值（ 数字、字符串、布尔值） ，则只要两个值严
// 格相等，Map 将其视为一个键，比如 0 和 -0 就是一个键，布尔值 true 和字符
// 串 true 则是两个不同的键。另外， undefined 和 null 也是两个不同的键。虽
// 然 NaN 不严格相等于自身，但 Map 将其视为同一个键
let map = new Map();
map.set(-0, 123);
map.get(+0) // 123
map.set(true, 1);
map.set('true', 2);
map.get(true) // 1
map.set(undefined, 3);
map.set(null, 4);
map.get(undefined) // 3
map.set(NaN, 123);
map.get(NaN) // 123
