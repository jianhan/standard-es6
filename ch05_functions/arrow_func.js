var f = v => v;
// 上面的箭头函数等同于：
var f = function(v) {
  return v;
};

// 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分
var f = () => 5;
// 等同于
var f = function() {
  return 5
};
var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
}

// 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用 return 语句返回。
var sum = (num1, num2) => {
  return num1 + num2;
}

// 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错
// 报错
let getTempItem = id => {
  id: id,
  name: "Temp"
};
// 不报错
let getTempItem = id => ({
  id: id,
  name: "Temp"
});

// 如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了。
let fn = () => void doesNotReturn();

// 使用注意点
// 1. 函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象
// 第一点尤其值得注意。 this 对象的指向是可变的，但是在箭头函数中，它是固定的。
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}
var id = 21;
foo.call({
  id: 42
});
// id: 42
// 上面代码中， setTimeout 的参数是一个箭头函数，这个箭头函数的定义生效是
// 在 foo 函数生成时，而它的真正执行要等到100毫秒后。如果是普通函数，执行
// 时 this 应该指向全局对象 window ，这时应该输出 21 。但是，箭头函数导
// 致 this 总是指向函数定义生效时所在的对象（本例是 {id: 42} ） ，所以输出的是 42
// 箭头函数可以让 setTimeout 里面的 this ，绑定定义时所在的作用域，而不是指向运行时所在的作用域

// 箭头函数可以让 this 指向固定化，这种特性很有利于封装回调函数。下面是一个例子，DOM 事件的回调函数封装在一个对象里面
var handler = {
  id: '123456',
  init: function() {
    document.addEventListener('click',
      event => this.doSomething(event.type), false);
  },
  doSomething: function(type) {
    console.log('Handling ' + type + ' for ' + this.id);
  }
};

// this 指向的固定化，并不是因为箭头函数内部有绑定 this 的机制，实际原因是箭头函数根本没有自己的 this ，导致内部的 this 就是外层代码块
// 的 this 。正是因为它没有 this ，所以也就不能用作构造函

function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}
var f = foo.call({
  id: 1
});
var t1 = f.call({
  id: 2
})()(); // id: 1
var t2 = f().call({
  id: 3
})(); // id: 1
var t3 = f()().call({
  id: 4
}); // id: 1
// 上面代码之中，只有一个 this ，就是函数 foo 的 this ，所
// 以 t1 、 t2 、 t3 都输出同样的结果。因为所有的内层函数都是箭头函数，都
// 没有自己的 this ，它们的 this 其实都是最外层 foo 函数的 this

// 除了 this ，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量： arguments 、 super 、 new.target
function foo() {
  setTimeout(() => {
    console.log('args:', arguments);
  }, 100);
}
foo(2, 4, 6, 8)
// args: [2, 4, 6, 8]

// 嵌套的箭头函数
// 箭头函数内部，还可以再使用箭头函数。下面是一个 ES5 语法的多重嵌套函数
function insert(value) {
  return {
    into: function(array) {
      return {
        after: function(afterValue) {
          array.splice(array.indexOf(afterValue) + 1, 0, value);
          return array;
        }
      };
    }
  };
}
insert(2).into([1, 3]).after(1); //[1, 2, 3]
// 上面这个函数，可以使用箭头函数改写
let insert = (value) => ({
  into: (array) => ({
    after: (afterValue) => {
      array.splice(array.indexOf(afterValue) + 1, 0, value);
      return array;
    }
  })
});
insert(2).into([1, 3]).after(1); //[1, 2, 3]

const pipeline = (...funcs) =>
val => funcs.reduce((a, b) => b(a), val);
const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);
addThenMult(5)
// 12
// 如果觉得上面的写法可读性比较差，也可以采用下面的写法。
const plus1 = a => a + 1;
const mult2 = a => a * 2;
mult2(plus1(5))
// 12
