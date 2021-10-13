
type Worker = {
  custname: string
}
type Customer = {
  custname: string,
  age: number
}

type oneType<T, K> = K extends keyof T ? K : never

type oneTypeResult = oneType<Customer, "custname">// 输出custname类型
type oneTwoTypeResult = oneType<Customer, "xx">// 输出never

//type oneType<Customer,  "custname"> = 
//          "custname" extends "custname" |"age" ? "custname" : never

type twoType<T, K> = K extends keyof T ? T[K] : never
type twoTypeResult = twoType<Customer, "age">// 输出number

//type twoType<Customer, "age"> = "age" extends keyof Customer ?
//   Customer["age"] : never

//type valueType = Customer["age"]//number
export { }