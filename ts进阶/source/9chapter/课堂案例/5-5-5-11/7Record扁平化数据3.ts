
type Worker = {
  custname: string
}
type Customer = {
  custname: string,
  age: number
}

type oneType<K> = K extends keyof any ? K : never
//type oneAnyType = keyof any// = type oneAnyType=string | number | symbol

//type oneResultType = oneType<Worker>//never
let count: number = 3;
type twoResultType = oneType<number>// number
let strName: string = "abc";
type threeResultType = oneType<typeof strName>// string

type fourResultType = oneType<3>// 3被当成值类型 是一个类型 返回3也是一个值类型
let stuSymid: symbol = Symbol["stuid"]
type symType = typeof stuSymid//symbol
type fiveResultType = oneType<symbol>//symbol

export { }