// Number.isFinite(), Number.isNaN()
// ES6 在 Number 对象上，新提供了 Number.isFinite() 和 Number.isNaN() 两个方法

// Number.isFinite() 用来检查一个数值是否为有限的（ finite）
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false

// Number.isNaN() 用来检查一个值是否为 NaN
Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(true) // false
Number.isNaN(9/NaN) // true
Number.isNaN('true'/0) // true
Number.isNaN('true'/'true') // true

// Number.parseInt(), Number.parseFloat(), ES6 将全局方法 parseInt() 和 parseFloat() ，移植到 Number 对象上面，行为完全保持不变
// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45
// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45
// 这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。
Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true

// Number.isInteger()
// Number.isInteger() 用来判断一个值是否为整数。需要注意的是，在JavaScript 内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值
Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger(25.1) // false
Number.isInteger("15") // false
Number.isInteger(true) // false

// Number.EPSILON, ES6在Number对象上面，新增一个极小的常量 Number.EPSILON
Number.EPSILON
// 2.220446049250313e-16
Number.EPSILON.toFixed(20)
// '0.00000000000000022204'

// 引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围。我们知道浮点数计算是不精确的
0.1 + 0.2
// 0.30000000000000004
0.1 + 0.2 - 0.3
// 5.551115123125783e-17
5.551115123125783e-17.toFixed(20)
// '0.00000000000000005551'
// 但是如果这个误差能够小于 Number.EPSILON ，我们就可以认为得到了正确结果
5.551115123125783e-17 < Number.EPSILON
// true
// 因此， Number.EPSILON 的实质是一个可以接受的误差范围
function withinErrorMargin (left, right) {
return Math.abs(left - right) < Number.EPSILON;
}
withinErrorMargin(0.1 + 0.2, 0.3)
// true
withinErrorMargin(0.2 + 0.2, 0.3)
// false
// 上面的代码为浮点数运算，部署了一个误差检查函数

// 安全整数和Number.isSafeInteger()
// JavaScript能够准确表示的整数范围在 -2^53 到 2^53 之间（ 不含两个端点） ，超过这个范围，无法精确表示这个值。
console.log(Math.pow(2, 53))
console.log(Math.pow(2, 53) === Math.pow(2, 53) + 1)
// 上面代码中，超出2的53次方之后，一个数就不精确了
// ES6引入了 Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER 这两个
// 常量，用来表示这个范围的上下限
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
// true
Number.MAX_SAFE_INTEGER === 9007199254740991
// true
Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
// true
Number.MIN_SAFE_INTEGER === -9007199254740991
// true
// 上面代码中，可以看到JavaScript能够精确表示的极限
// Number.isSafeInteger() 则是用来判断一个整数是否落在这个范围之内
Number.isSafeInteger('a') // false
Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false
Number.isSafeInteger(3) // true
Number.isSafeInteger(1.2) // false
Number.isSafeInteger(9007199254740990) // true
Number.isSafeInteger(9007199254740992) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
