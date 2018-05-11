// 作用域一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域
// （ context） 。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参
// 数默认值时，是不会出现的

var x = 1;

function f(x, y = x) {
  console.log(y);
}
f(2) // 2

let x = 1;

function f(y = x) {
  let x = 2;
  console.log(y);
}
f() // 1
// 上面代码中，函数 f 调用时，参数 y = x 形成一个单独的作用域。这个作用域里
// 面，变量 x 本身没有定义，所以指向外层的全局变量 x 。函数调用时，函数体内
// 部的局部变量 x 影响不到默认值变量 x 。
// 如果此时，全局变量 x 不存在，就会报错

// 如果参数的默认值是一个函数，该函数的作用域也遵守这个规则。请看下面的例子
let foo = 'outer';

function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}
bar(); // outer

// 如果写成下面这样，就会报错。
function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}
bar() // ReferenceError: foo is not defined
