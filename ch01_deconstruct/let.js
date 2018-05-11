// 但是所声明的变量，只在 let 命令所在的代码块内有效

{
    let a = 10;
    var b = 1;
}
// ReferenceError: a is not defined.
console.log(b) // 1
// a is not defined console.log(a) let with for example

for (let k = 0; k < 10; k++) {
    console.log(k)
}

var a = []
for (var i = 0; i < 10; i++) {
    a[i] = function () {
        console.log("In loop fetch value of I", i)
    }
}

console.log("Value of A6 is", a[6](), a[5]())

// scope
for (let i = 0; i < 3; i++) {
    let i = 'abc';
    console.log(i);
}

// var 命令会发生”变量提升“现象，即变量可以在声明之前使用，值为 undefined
console.log(x)
var x = 12

// tmp dead zone
var tmp = 123;
if (true) {
    // tmp = 'abc'; // ReferenceError
    let tmp;
}

// 上面代码中，存在全局变量 tmp ，但是块级作用域内 let 又声明了一个局部变 量 tmp ，导致后者绑定这个块级作用域，所以在 let 声明变量前，对
// tmp 赋值 会报错。 ES6明确规定，如果区块中存在 let 和 const 命令，这个区块对这些命令声明的
// 变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报 错。 总之，在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。这在语
// 法上，称为“暂时性死区”（ temporal dead zone，简称 TDZ）

// can not use a variable before it defined
if (true) {
    let tmp2 = 1
    console.log(tmp2)

}

// type of is no longer safe if use let
console.log("type of x2",typeof x2) // this will not error out since x2 is not defined at all
console.log(typeof x1) // error out
let x1 = 1
