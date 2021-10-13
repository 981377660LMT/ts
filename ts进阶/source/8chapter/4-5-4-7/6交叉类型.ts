
//定义：将多个类型合并【多个类型属性和方法的并集】成的类型就是交叉类型。
type objtype1 = { username: string, age: number }
type objtype2 = { custname: string, phone: number, age: number }
type objtype3 = { address: string }

let first: objtype1 = { username: "wangwu", age: 23 }
let second: objtype2 = { custname: "lisi", phone: 111, age: 23 }

// 定义：将多个类型合并【多个类型属性和方法的并集】成的类型就是交叉类型。
let jiaochatype: objtype1 & objtype2 & objtype3 = {
  username: "wangwu", age: 23, custname: "lisi", phone: 111, address: "shanghai"
}


let uniontype: objtype1 | objtype2 = {
  username: "wangwu", age: 23, custname: "lisi", phone: 111
}
