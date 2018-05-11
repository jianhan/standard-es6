// 1. Exchange variable
let x = 1;
let y = 2;
[x, y] = [y, x];

// 2. 函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();
console.log(a, b, c)

// 返回一个对象
function exampleArr() {
  return {
    foo: 1,
    bar: 2
  };
}
let {
  foo,
  bar
} = exampleArr();
console.log(foo, bar)

// 3. 函数参数的定义, 解构赋值可以方便地将一组参数与变量名对应起来

function printPerson({
  name,
  age,
  address
}) {
  console.log(name, age, address)
}

printPerson({
  name: "James",
  age: 21,
  address: "james street"
})

// 4. 提取JSON数据, 解构赋值对提取JSON对象中的数据，尤其有用
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};
let {
  id,
  status,
  data: number
} = jsonData;
console.log(id, status, number);

// 5. 函数参数的默认值
// jQuery.ajax = function(url, {
//   async = true,
//   beforeSend = function() {},
//   cache = true,
//   complete = function() {},
//   crossDomain = false,
//   global = true,
//   // ... more config
// }) {
//   // ... do stuff
// };

// 6. 遍历Map结构
// 任何部署了Iterator接口的对象，都可以用 for...of 循环遍历。Map结构原生支持Iterator接口，配合变量的解构赋值，获取键名和键值就非常方便
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
for (let [key, value] of map) {
  console.log(key + " is " + value);
}

// 如果只想获取键名，或者只想获取键值，可以写成下面这样
// 获取键名
for (let [key] of map) {
  // ...
}
// 获取键值
for (let [, value] of map) {
  // ...
}

// 7. 输入模块的指定方法
// 加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰

const { SourceMapConsumer, SourceNode } = require("source-map")
