// 函数参数的解构赋值, 函数的参数也可以使用解构赋值

function add([x, y]) {
  return x + y;
}
console.log(add([1, 2]))

console.log([[1, 2], [3, 4]].map(([a, b]) => a + b))

// 函数参数的解构也可以使用默认值
function move({x = 0, y = 0} = {}) {
  return [x, y];
}
console.log(move({x: 3, y: 8})); // [3, 8]
console.log(move({x: 3})); // [3, 0]
console.log(move({})); // [0, 0]
console.log(move()); // [0, 0]

// ES6 的规则是，只要有可能
// 导致解构的歧义，就不得使用圆括号。
// 但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此，建议只要有可
// 能，就不要在模式中放置圆括号

// 可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号

[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
