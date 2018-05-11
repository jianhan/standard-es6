// ES6 允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
var foo = 'bar';
var baz = {
  foo
};
baz // {foo: "bar"}
// 等同于
var baz = {
  foo: foo
};

function f(x, y) {
  return {
    x,
    y
  };
}
// 等同于
function f(x, y) {
  return {
    x: x,
    y: y
  };
}
f(1, 2) // Object {x: 1, y: 2}

// 除了属性简写，方法也可以简写

var o = {
  method() {
    return "Hello!";
  }
};
// 等同于
var o = {
  method: function() {
    return "Hello!";
  }
};

下面是一个实际的例子。
var birth = '2000/01/01';
var Person = {
  name: '张三',
  //等同于birth: birth
  birth,
  // 等同于hello: function ()...
  hello() {
    console.log('我的名字是', this.name);
  }
};

// 这种写法用于函数的返回值，将会非常方便。

function getPoint() {
  var x = 1;
  var y = 10;
  return {
    x,
    y
  };
}
getPoint()
// {x:1, y:10}

// 属性的赋值器（ setter） 和取值器（ getter） ，事实上也是采用这种写法。
var cart = {
  _wheels: 4,
  get wheels() {
    return this._wheels;
  },
  set wheels(value) {
    if (value < this._wheels) {
      throw new Error('数值太小了！');
    }
    this._wheels = value;
  }
}

// 注意，简洁写法的属性名总是字符串，这会导致一些看上去比较奇怪的结果。
var obj = {
  class() {}
};
// 等同于
var obj = {
  'class': function() {}
};
