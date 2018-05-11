// 数组实例的 find() 和 findIndex()
// 数组实例的 find 方法，用于找出第一个符合条件的数组成员。它的参数是一个回
// 调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为 true 的成
// 员，然后返回该成员。如果没有符合条件的成员，则返回 undefined 。

[1, 4, -5, 10].find((n) => n < 0)
// -5
// 上面代码找出数组中第一个小于0的成员。
[1, 5, 10, 15].find(function(value, index, arr) {
return value > 9;
}) // 10
// 上面代码中， find 方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组

// 另外，这两个方法都可以发现 NaN ，弥补了数组的 IndexOf 方法的不足。
[NaN].indexOf(NaN)
// -1
[NaN].findIndex(y => Object.is(NaN, y))
// 0
