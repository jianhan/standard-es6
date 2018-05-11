// 尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用
// 位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了

// 但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5)) // 120
// 上面代码是一个阶乘函数，计算 n 的阶乘，最多需要保存 n 个调用记录，复杂度O(n)

// 如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。
function factorialTailCall(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
console.log(factorialTailCall(5, 1)) // 120

// 非尾递归的 Fibonacci 数列实现如下。
function Fibonacci(n) {
  if (n <= 1) {
    return 1
  };
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}
// Fibonacci(10) // 89
// Fibonacci(100) // 堆栈溢出
// Fibonacci(500) // 堆栈溢出

// 尾递归优化过的 Fibonacci 数列实现如下。
function Fibonacci2(n, ac1 = 1, ac2 = 1) {
  if (n <= 1) {
    return ac2
  };
  return Fibonacci2(n - 1, ac2, ac1 + ac2);
}
console.log(Fibonacci2(100)) // 573147844013817200000
console.log(Fibonacci2(1000)) // 7.0330367711422765e+208
// Fibonacci2(10000) // Infinity

// 由此可见，“尾调用优化”对递归操作意义重大，所以一些函数式编程语言将其写入
// 了语言规格。ES6 是如此，第一次明确规定，所有 ECMAScript 的实现，都必须部
// 署“尾调用优化”。这就是说，ES6 中只要使用尾递归，就不会发生栈溢出，相对节
// 函数的扩展省内存

// 尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。
// 这样做的缺点就是不太直观
// 两个方法可以解决这个问题。方法一是在尾递归函数之外，再提供一个正常形式的函数

function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

function factorial(n) {
  return tailFactorial(n, 1);
}
factorial(5) // 120

// 函数式编程有一个概念，叫做柯里化（ currying） ，意思是将多参数的函数转换成单参数的形式。这里也可以使用柯里化。
function currying(fn, n) {
  return function(m) {
    return fn.call(this, m, n);
  };
}

function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}
const factorial = currying(tailFactorial, 1);
factorial(5) // 120

// 第二种方法就简单多了，就是采用 ES6 的函数默认值
function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
factorial(5) // 120
// 纯粹的函数式编程语言没有循环操作命令，所有的循环都用递归实现，这就是为什么尾递归对这些语言极其重要
// 只需要知道循环可以用递归代替，而一旦使用递归，就最好使用尾递归
