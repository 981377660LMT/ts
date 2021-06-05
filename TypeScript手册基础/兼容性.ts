interface Named {
  name: string
}

let x: Named
// y's inferred type is { name: string; location: string; }
let y = { name: 'Alice', location: 'Seattle' }
// 这里要检查 y 是否能赋值给 x ，编译器检查 x 中的每个属性，看是否能在 y 中也找到对应属性。
x = y

export {}
///////////////////////////////
// 比较两个函数:
// 1.参数
// 可以少传,不能多传
// 你可能会疑惑为什么允许 忽略 参数，像例子 y = x 中那样。 原因是忽略额外的参数在 JavaScript 里是很常见的。
// 例如， Array#forEach 给回调函数传 3 个参数：数组元素，索引和整个数组。 尽管如此，传入一个只使用第一个参数的回调函数也是很有用的：
let x_ = (a: number) => 0
let y_ = (b: number, s: string) => 0

y_ = x_ // OK
x_ = y_ // Error
// 2.返回值
// 与非函数变量的比较一样,可以多传,不能少传
let c = () => ({ name: 'Alice' })
let d = () => ({ name: 'Alice', location: 'Seattle' })

c = d // OK
d = c // Error, because x() lacks a location property
