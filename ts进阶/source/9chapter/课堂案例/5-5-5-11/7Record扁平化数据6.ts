type Worker = {
  custname: string
}
type Customer = {
  custname: string,
  age: number
  phone: string
}
//  [P in string]可以代表任意一个字符串的可索引类型
type Record<K extends keyof any, T> = {
  [P in string]: T
}
// S100输出的结果

type resultRecord = Record<string, Customer>//S100
let obj: resultRecord =
{
  "usernamed": { custname: "wangwu", age: 23, phone: "111" },
  "agde": { custname: "lisi", age: 33, phone: "23" }
}


//let cust: Customer = { custname: "wangwu", age: 23, phone: "111" }


export { }