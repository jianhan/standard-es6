// 遍历方法
// Map 结构原生提供三个遍历器生成函数和一个遍历方法

// keys() ：返回键名的遍历器。
// values() ：返回键值的遍历器。
// entries() ：返回所有成员的遍历器。
// forEach() ：遍历 Map 的所有成员。
// 需要特别注意的是，Map 的遍历顺序就是插入顺序

const map = new Map([
  ['F', 'no'],
  ['T', 'yes'],
]);
for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"
for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"
for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"
// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// Map 结构转为数组结构，比较快速的方法是使用扩展运算符（... ） 。
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);
[...map.keys()]
// [1, 2, 3]
[...map.values()]
// ['one', 'two', 'three']
[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]
[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]
// 结合数组的 map 方法、 filter 方法，可以实现 Map 的遍历和过滤（ Map 本身
// 没有 map 和 filter 方法）

// const map0 = new Map()
.set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');
const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)
);
// 产生 Map 结构 {1 => 'a', 2 => 'b'}
const map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v])
);
// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
// 此外，Map 还有一个 forEach 方法，与数组的 forEach 方法类似，也可以实现
// 遍历。
map.forEach(function(value, key, map) {
  console.log("Key: %s, Value: %s", key, value);
});
// forEach 方法还可以接受第二个参数，用来绑定 this 。
const reporter = {
  report: function(key, value) {
    console.log("Key: %s, Value: %s", key, value);
  }
};
map.forEach(function(value, key, map) {
  this.report(key, value);
}, reporter);
// 上面代码中， forEach 方法的回调函数的 this ，就指向 reporter
