
let myassert = {
  custname: "caipiao", phone: 111, address: "shenzhen"
}
//myassert as objtype1
type objtype1 = { username: string, age: number }
type objtype2 = { custname: string, phone: number, age: number }
type objtype3 = { weixin:string }


let obj = {}
let combine = obj as objtype1 & objtype2
console.log("combine:", combine)
let comine2= combine as  objtype1 & objtype2 & objtype3

console.log("combine:", obj);
let first: objtype1 = { username: "wangwu", age: 23 }
let second: objtype2 = { custname: "lisi", phone: 111, age: 23 }
Object.keys(first).forEach((key) => {
  combine[key] = first[key]
})
console.log("combine1:", combine);

Object.keys(second).forEach((key) => {
  if (!obj.hasOwnProperty(key)) {// 如果obj中已经包含了该key属性，并且key值相同，不想重复添加
    combine[key] = second[key]
  }
})
console.log("combine2:", combine);
export { }