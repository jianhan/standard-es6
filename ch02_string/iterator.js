// 字符串的遍历器接口
// ES6为字符串添加了遍历器接口（ 详见《 Iterator》 一章） ，使得字符串可以被 for...of 循环遍历

for (let codePoint of 'foo') {
  console.log(codePoint)
}

// 除了遍历字符串，这个遍历器最大的优点是可以识别大于 0xFFFF 的码点，传统的 for 循环无法识别这样的码点

// includes(), startsWith(), endsWith()
// 传统上，JavaScript只有 indexOf 方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6又提供了三种新方法

var s = 'Hello world!';
console.log(s.startsWith('Hello')) // true
console.log(s.endsWith('!')) // true
console.log(s.includes('o')) // true

// 这三个方法都支持第二个参数，表示开始搜索的位置。

var s = 'Hello world!';
console.log(s.startsWith('world', 6)) // true
console.log(s.endsWith('Hello', 5)) // true
console.log(s.includes('Hello', 6))

// repeat 方法返回一个新字符串，表示将原字符串重复 n 次
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""

// 参数如果是小数，会被取整
'na'.repeat(2.9) // "nana"

// 如果 repeat 的参数是负数或者 Infinity ，会报错
'na'.repeat(Infinity)
// RangeError
'na'.repeat(-1)
// RangeError

// 但是，如果参数是0到-1之间的小数，则等同于0，这是因为会先进行取整运算。0
// 到-1之间的小数，取整以后等于 -0 ， repeat 视同为0。
'na'.repeat(-0.9) // ""
// 参数 NaN 等同于0。
'na'.repeat(NaN) // ""

// 如果 repeat 的参数是字符串，则会先转换成数字。
'na'.repeat('na') // ""
'na'.repeat('3') // "nanana"
