type Worker = {
  custname: string
}
type Customer = {
  custname: string,
  age: number
  phone: string
}

type Record<K extends keyof any, T> = {
  [P in K]: T
}
// S100输出的结果

type resultRecord = Record<string, Customer>//S100
let obj: resultRecord =
{
  "usernamed": { custname: "wangwu", age: 23, phone: "111" },
  "agde": { custname: "lisi", age: 33, phone: "23" }
}
type resultRecord2 = Record<number, Customer>//S100
let objarray: resultRecord2 = [{ custname: "wangwu", age: 23, phone: "111" },
{ custname: "lisi", age: 33, phone: "23" }]

//let cust: Customer = { custname: "wangwu", age: 23, phone: "111" }


export { }