// 模板字符串, 传统的JavaScript语言，输出模板通常是这样写的
$('#result').append(
  'There are <b>' + basket.count + '</b> ' +
  'items in your basket, ' +
  '<em>' + basket.onSale +
  '</em> are on sale!'
);

// 上面这种写法相当繁琐不方便，ES6引入了模板字符串解决这个问题
$('#result').append(`
There are <b>${basket.count}</b> items
in your basket, <em>${basket.onSale}</em>
are on sale!
`);

// 模板字符串（ template string） 是增强版的字符串，用反引号（ `） 标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量
// 普通字符串
`In JavaScript '\n' is a line-feed.`
// 多行字符串
`In JavaScript this is
not legal.`
console.log(`string text line 1
string text line 2`);
// 字符串中嵌入变量
var name = "Bob",
  time = "today";
`Hello ${name}, how are you ${time}?`

// 如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中
$('#list').html(`
<ul>
<li>first</li>
<li>second</li>
</ul>
`);

// 上面代码中，所有模板字符串的空格和换行，都是被保留的，比如 <ul> 标签前面会有一个换行。如果你不想要这个换行，可以使用 trim 方法消除它
$('#list').html(`
<ul>
<li>first</li>
<li>second</li>
</ul>
`.trim());

// 大括号内部可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性
var x = 1;
var y = 2;
`${x} + ${y} = ${x + y}`
// "1 + 2 = 3"
`${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"
var obj = {
  x: 1,
  y: 2
};
`${obj.x + obj.y}`
// "3"

// 模板字符串之中还能调用函数
function fn() {
  return "Hello World";
}
`
foo ${fn()} bar`
// foo Hello World bar

// 如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，大括号中是一个对象，将默认调用对象的 toString 方法
// 如果模板字符串中的变量没有声明，将报错
// 变量place没有声明
var msg = `Hello, ${place}`;
// 报错

// 模板字符串甚至还能嵌套
const tmpl = addrs => `
<table>
${addrs.map(addr => `
<tr><td>${addr.first}</td></tr>
<tr><td>${addr.last}</td></tr>
`).join('')}
</table>
`;

const data = [
{ first: '<Jane>', last: 'Bond' },
{ first: 'Lars', last: '<Croft>' },
];
console.log(tmpl(data));

// 如果需要引用模板字符串本身，在需要时执行，可以像下面这样写
// 写法一
let str = 'return ' + '`Hello ${name}!`';
let func = new Function('name', str);
func('Jack') // "Hello Jack!"
// 写法二
let str = '(name) => `Hello ${name}!`';
let func = eval.call(null, str);
func('Jack') // "Hello Jack!"
