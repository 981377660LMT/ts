// T extends U ? X : Y
declare function f<T extends boolean>(x: T): T extends true ? string : number

const x = f(Math.random() < 0.5) // const x: string | number

const y = f(true) // const y: string
const z = f(false) // const z: number

export default 0
// Exclude<T, U> – 从 T 中剔除可以赋值给 U 的类型。
// Extract<T, U> – 提取 T 中可以赋值给 U 的类型。
// NonNullable<T> – 从 T 中剔除 null 和 undefined。
// ReturnType<T> – 获取函数返回值类型。
// InstanceType<T> – 获取构造函数类型的实例类型。
type T00 = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>
// 定义一种方法，可以取出接口类型中的函数类型
type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>

interface Part {
  id: number
  name: string
  subparts: Part[]
  firstFn: (brand: string) => void
  anotherFn: (channel: string) => string
}

type FnNames = FunctionPropertyNames<Part>
type FnProperties = FunctionProperties<Part>
type a = Pick<Part, 'id' | 'anotherFn'>
