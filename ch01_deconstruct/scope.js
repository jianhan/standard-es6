// ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。 第一种场景，内层变量可能会覆盖外层变量。
var tmp = new Date();
function f() {
    console.log(tmp);
    if (false) {
        var tmp = 'hello world';
    }
}
f(); // undefined

// 第二种场景，用来计数的循环变量泄露为全局变量。

var s = 'hello';
for (var i = 0; i < s.length; i++) {
    console.log(s[i]);
}
console.log(i); // 5
// 上面代码中，变量 i 只用来控制循环，但是循环结束后，它并没有消失，泄露成 了全局变量 es6 let scope

function f1() {
    let x = 1
    {
        let x = 2
    }
    console.log(x)
}

f1()

// ES6 规定，块级作用域之中，函数声明语句的行为类似于 let ，在块级作用域之外不可引用 ES5 example

function f() {
    console.log('I am outside!');
}(function () {
    if (false) {
        // 重复声明一次函数f
        function f() {
            console.log('I am inside!');
        }
    }
    f();
}());

// 上面代码在 ES5 中运行，会得到“I am inside!”，因为在 if 内声明的函数 f 会被提升到函数头部，实际运行的代码如下。 上面的代码在符合
// ES6 的浏览器中，都会报错 考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需 要，也应该写成函数表达式，而不是函数声明语句
// 函数声明语句
{
    let a = 'secret';
    function f() {
        return a;
    }
}
{ // 函数表达式
    let
    a = 'secret'; let
    f = function () {return
        a;
    };
}