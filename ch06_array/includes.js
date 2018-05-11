// Array.prototype.includes 方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的 includes 方法类似

[1, 2, 3].includes(2) // true
[1, 2, 3].includes(4) // false
[1, 2, NaN].includes(NaN) // true

// 该方法的第二个参数表示搜索的起始位置，默认为 0 。如果第二个参数为负数，
// 则表示倒数的位置，如果这时它大于数组长度（ 比如第二个参数为 -4 ，但数组长
// 度为 3 ） ，则会重置为从 0 开始

[1, 2, 3].includes(3, 3); // false
[1, 2, 3].includes(3, -1); // true

// 另外，Map 和 Set 数据结构有一个 has 方法，需要注意与 includes 区分。
// Map 结构的 has 方法，是用来查找键名的，比
// 如 Map.prototype.has(key) 、 WeakMap.prototype.has(key) 、 Refle
// ct.has(target, propertyKey) 。
// Set 结构的 has 方法，是用来查找值的，比
// 如 Set.prototype.has(value) 、 WeakSet.prototype.has(value) 
