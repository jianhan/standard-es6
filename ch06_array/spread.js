// 扩展运算符（ spread） 是三个点（... ） 。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列

console.log(...[1, 2, 3])
// 1 2 3
console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5
[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]

// 该运算符主要用于函数调用
function push(array, ...items) {
  array.push(...items);
}

function add(x, y) {
  return x + y;
}
var numbers = [4, 38];
add(...numbers) // 42

// 扩展运算符后面还可以放置表达式。
const arr = [
  ...(x > 0 ? ['a'] : []),
  'b',
];
