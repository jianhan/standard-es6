// Math.trunc 方法用于去除一个数的小数部分，返回整数部分
Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0

// 对于非数值， Math.trunc 内部使用 Number 方法将其先转为数值
Math.trunc('123.456')
// 123

// 对于空值和无法截取整数的值，返回NaN
Math.trunc(NaN); // NaN
Math.trunc('foo'); // NaN
Math.trunc();

// Math.sign 方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。它会返回五种值。
// 参数为正数，返回+1；
// 参数为负数，返回-1；
// 参数为0，返回0；
// 参数为-0，返回-0;
// 其他值，返回NaN。
Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN
Math.sign('9'); // +1
Math.sign('foo'); // NaN
Math.sign(); // NaN

// Math.cbrt 方法用于计算一个数的立方根
Math.cbrt(-1) // -1
Math.cbrt(0) // 0
Math.cbrt(1) // 1
Math.cbrt(2) // 1.2599210498948734

// 对于非数值， Math.cbrt 方法内部也是先使用 Number 方法将其转为数值。
Math.cbrt('8') // 2
Math.cbrt('hello') // NaN

// Math.clz32()
// JavaScript的整数使用32位二进制形式表示， Math.clz32 方法返回一个数的32位
// 无符号整数形式有多少个前导0
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22
Math.clz32(0b01000000000000000000000000000000) // 1
Math.clz32(0b00100000000000000000000000000000) // 2

// Math.fround方法返回一个数的单精度浮点数形式。
Math.fround(0) // 0
Math.fround(1) // 1
Math.fround(1.337) // 1.3370000123977661
Math.fround(1.5) // 1.5
Math.fround(NaN) // NaN
