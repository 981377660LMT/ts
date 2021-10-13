type Worker = {
  custname: string
}
type Customer = {
  custname: string,
  age: number
  phone: string
}

type Record<K extends keyof any, T> = {
  [P in "username" | "age"]: T
}



// S100输出的结果
// type resultRecord = {
//   username: Customer;
//   age: Customer;
// }
type resultRecord = Record<string, Customer>//S100



//let cust: Customer = { custname: "wangwu", age: 23, phone: "111" }


export { }