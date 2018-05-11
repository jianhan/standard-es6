// 数组的空位指，数组的某一个位置没有任何值。比如， Array 构造函数返回的数
// 组都是空位。
Array(3) // [, , ,]

// 注意，空位不是 undefined ，一个位置的值等于 undefined ，依然是有值的。
// 空位是没有任何值， in 运算符可以说明这一点。

0 in [undefined, undefined, undefined] // true
0 in [, , , ] // false
// 上面代码说明，第一个数组的0号位置是有值的，第二个数组的0号位置没有值

// ES6 则是明确将空位转为 undefined 。
// Array.from 方法会将数组的空位，转为 undefined ，也就是说，这个方法不会忽略空位。

Array.from(['a', , 'b'])
// [ "a", undefined, "b" ]

// 扩展运算符（... ） 也会将空位转为 undefined
[...['a', , 'b']]
// [ "a", undefined, "b" ]

// copyWithin() 会连空位一起拷贝。
[, 'a', 'b', , ].copyWithin(2, 0) // [,"a",,"a"]
// fill() 会将空位视为正常的数组位置。
new Array(3).fill('a') // ["a","a","a"]
// for...of 循环也会遍历空位。
let arr = [, , ];
for (let i of arr) {
  console.log(1);
}
// 1
// 1

// 上面代码中，数组 arr 有两个空位， for...of 并没有忽略它们。如果改成 map 方法遍历，空位是会跳过的
// entries() 、 keys() 、 values() 、 find() 和 findIndex() 会将空位处理成 undefined 。

// // entries()
[...[,'a'].entries()] // [[0,undefined], [1,"a"]]
// keys()
[...[,'a'].keys()] // [0,1]
// values()
[...[,'a'].values()] // [undefined,"a"]
// find()
[,'a'].find(x => true) // undefined
// findIndex()
[,'a'].findIndex(x => true) // 0
// 由于空位的处理规则非常不统一，所以建议避免出现空位。
