// 与其他数据结构的互相转换

// （ 1） Map 转为数组
// 前面已经提过，Map 转为数组最方便的方法，就是使用扩展运算符（... ） 。
const myMap = new Map()
  .set(true, 7)
  .set({
    foo: 3
  }, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]

// （ 2） 数组 转为 Map
// 将数组传入 Map 构造函数，就可以转为 Map。
new Map([
  [true, 7],
  [{
      foo: 3
    },
    ['abc']
  ]
])
// Map {
// true => 7,
// Object {foo: 3} => ['abc']
// }

// （ 3） Map 转为对象
// 如果所有 Map 的键都是字符串，它可以转为对象
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k, v] of strMap) {
    obj[k] = v;
  }
  return obj;
}
const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }

// （ 4） 对象转为 Map
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}
objToStrMap({
  yes: true,
  no: false
})
// Map {"yes" => true, "no" => false}

// （ 5） Map 转为 JSON
// Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可
// 以选择转为对象 JSON。

function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}
let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'

// （ 6） JSON 转为 Map
// JSON 转为 Map，正常情况下，所有键名都是字符串。
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}
jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}
// 但是，有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一
// 个有两个成员的数组。这时，它可以一一对应地转为Map。这往往是数组转为
// JSON 的逆操作
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}
jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}
