// 遍历操作Set 结构的实例有四个遍历方法，可以用于遍历成员。
keys() //：返回键名的遍历器
values() //：返回键值的遍历器
entries() //：返回键值对的遍历器
forEach() //：使用回调函数遍历每个成员
// 需要特别指出的是， Set 的遍历顺序就是插入顺序。这个特性有时非常有用，比
// 如使用Set保存一个回调函数列表，调用时就能保证按照添加顺序调用

// （ 1） keys() ， values() ， entries()
// keys 方法、 values 方法、 entries 方法返回的都是遍历器对象（ 详见
// 《 Iterator 对象》 一章） 。由于 Set 结构没有键名，只有键值（ 或者说键名和键值
// 是同一个值） ，所以 keys 方法和 values 方法的行为完全一致

let set = new Set(['red', 'green', 'blue']);
for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue
for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue
for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"

// （ 2） forEach()
// Set结构的实例的 forEach 方法，用于对每个成员执行某种操作，没有返回值。
let set = new Set([1, 2, 3]);
set.forEach((value, key) => console.log(value * 2))
// 2
// 4
// 6
// 上面代码说明， forEach 方法的参数就是一个处理函数。该函数的参数依次为键
// 值、键名、集合本身（上例省略了该参数） 。另外， forEach 方法还可以有第二
// 个参数，表示绑定的 this 对象。


// （ 3） 遍历的应用
// 扩展运算符（... ） 内部使用 for...of 循环，所以也可以用于 Set 结构。
let set = new Set(['red', 'green', 'blue']);
let arr = [...set];
// ['red', 'green', 'blue']
// 扩展运算符和 Set 结构相结合，就可以去除数组的重复成员。
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)];
// [3, 5, 2]

// 而且，数组的 map 和 filter 方法也可以用于 Set 了。
let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
// 返回Set结构：{2, 4, 6}
let set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));
// 返回Set结构：{2, 4}

// 因此使用 Set 可以很容易地实现并集（ Union） 、交集（ Intersect） 和差集（ Difference） 。
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}
// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}
// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}

// 如果想在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但有两种
// 变通方法。一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结
// 构；另一种是利用 Array.from 方法。
// 方法一
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
// set的值是2, 4, 6
// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6
