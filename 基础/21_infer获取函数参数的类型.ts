// T extends U表示T可以赋值给U
type ParamType<T> = T extends (...args: infer P) => any ? P : T
// 在这个条件语句 T extends (...args: infer P) => any ? P : T 中，infer P 表示待推断的函数参数。

// 整句表示为：如果 T 能赋值给 (...args: infer P) => any（一个函数），则结果是 (...args: infer P) => any 类型中的参数 P，否则返回为 T。
interface User {
  name: string
  age: number
}

type Func = (user: User) => void

type Param = ParamType<Func> // type Param = [user: User]
type AA = ParamType<string> // type AA = string
///////////////////////////////////////////////////////
// ReturnType提取函数类型的返回值类型：
type MyReturnType<T> = T extends (...args: any[]) => infer P ? P : any
type Func1 = () => User
type Test = MyReturnType<Func1> // Test = User
/////////////////////////////////////////////////////
// 获取构造函数参数类型
type MyConstructorParameters<T extends new (...args: any[]) => any> = T extends new (
  ...args: infer P
) => any
  ? P
  : never

class TestClass {
  constructor(public name: string, public age: number) {}
}
type Params = MyConstructorParameters<typeof TestClass>
//////////////////////////////
// 获取实例类型
type MyInstanceType<T extends new (...args: any[]) => any> = T extends new (
  ...args: any[]
) => infer R
  ? R
  : any
type Instance = MyInstanceType<typeof TestClass> // TestClass

///////////////////////////////////
// 元组转联合类型
type ElementOf<T> = T extends Array<infer U> ? U : never
type Union = ElementOf<[string, number]> // string | number
/////////////////////////////////////
// 联合类型转交叉类型
// type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
//   ? I
//   : never

// type Result = UnionToIntersection<T1 | T2> // T1 & T2

export {}
