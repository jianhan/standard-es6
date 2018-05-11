// Array.of 方法用于将一组值，转换为数组。
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1

Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
// 上面代码中， Array 方法没有参数、一个参数、三个参数时，返回结果都不一
// 样。只有当参数个数不少于2个时， Array() 才会返回由参数组成的新数组。参数
// 个数只有一个时，实际上是指定数组的长度

// Array.of 基本上可以用来替代 Array() 或 new Array() ，并且不存在由于参
// 数不同而导致的重载。它的行为非常统一。
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
