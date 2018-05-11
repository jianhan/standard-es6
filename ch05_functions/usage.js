// 利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误
function throwIfMissing() {
  throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}
foo()
// Error: Missing parameter

// rest 参数
function add(...values) {
  let sum = 0;
  for (var val of values) {
    sum += val;
  }
  return sum;
}
add(2, 5, 3) // 10

// rest 参数中的变量代表一个数组，所以数组特有的方法都可以用于这个变量。下面是一个利用 rest 参数改写数组 push 方法的例子
function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
    console.log(item);
  });
}
var a = [];
push(a, 1, 2, 3)

// 从 ES5 开始，函数内部可以设定为严格模式, ES2016 做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错
// 报错
function doSomething(a, b = a) {
  'use strict';
  // code
}
// 报错
const doSomething = function({
  a,
  b
}) {
  'use strict';
  // code
};
// 报错
const doSomething = (...a) => {
  'use strict';
  // code
};
const obj = {
  // 报错
  doSomething({
    a,
    b
  }) {
    'use strict';
    // code
  }
};

// 两种方法可以规避这种限制。第一种是设定全局性的严格模式，这是合法的
'use strict';

function doSomething(a, b = a) {
  // code
}
// 第二种是把函数包在一个无参数的立即执行函数里面
const doSomething = (function() {
  'use strict';
  return function(value = 42) {
    return value;
  };
}());

// 如果将一个匿名函数赋值给一个变量，ES5 的 name 属性，会返回空字符串，而 ES6 的 name 属性会返回实际的函数名。
// ES5
f.name // ""
// ES6
f.name // "f

const bar = function baz() {};
// ES5
bar.name // "baz"
// ES6
bar.name // "baz"

// bind 返回的函数， name 属性值会加上 bound 前缀。
function foo() {};
foo.bind({}).name // "bound foo"
(function(){}).bind({}).name // "bound "
