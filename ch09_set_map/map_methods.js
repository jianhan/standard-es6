// 实例的属性和操作方法
// Map 结构的实例有以下属性和操作方法。
// （ 1） size属性
// size 属性返回 Map 结构的成员总数。
const map = new Map();
map.set('foo', true);
map.set('bar', false);
map.size // 2

// （ 2） set(key, value)
// set 方法设置键名 key 对应的键值为 value ，然后返回整个 Map 结构。如
// 果 key 已经有值，则键值会被更新，否则就新生成该键

const m = new Map();
m.set('edition', 6) // 键是字符串
m.set(262, 'standard') // 键是数值
m.set(undefined, 'nah') // 键是 undefined
// set 方法返回的是当前的 Map 对象，因此可以采用链式写法。
let map = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');
// （ 3） get(key)
// get 方法读取 key 对应的键值，如果找不到 key ，返回 undefined 。
const m = new Map();
const hello = function() {
  console.log('hello');
};
m.set(hello, 'Hello ES6!') // 键是函数
m.get(hello) // Hello ES6!

// （ 4） has(key)
// has 方法返回一个布尔值，表示某个键是否在当前 Map 对象之中
const m = new Map();
m.set('edition', 6);
m.set(262, 'standard');
m.set(undefined, 'nah');
m.has('edition') // true
m.has('years') // false
m.has(262) // true
m.has(undefined) // true

// （ 5） delete(key)
// delete 方法删除某个键，返回 true 。如果删除失败，返回 false 。
const m = new Map();
m.set(undefined, 'nah');
m.has(undefined) // true
m.delete(undefined)
m.has(undefined) // false
// （ 6） clear()
// clear 方法清除所有成员，没有返回值。
let map = new Map();
map.set('foo', true);
map.set('bar', false);
map.size // 2
map.clear()
map.size // 0
