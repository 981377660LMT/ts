// 使用泛型(generic)来创建可重用的组件，一个组件可以支持多种类型的数据。
// 这样用户就可以以自己的数据类型来使用组件。
// T 泛型变量
// identity 泛型类型
// f2键改变名称
function identity<T>(arg: T): T {
  return arg
}

// identity('a')
identity<number>(1)
identity<string>('1')

interface IdentifyInterface<T> {
  (arg: T): T
}
////////////////////////////////////////////////////////////////////

// 泛型接口
let aasa: IdentifyInterface<number> = identity
////////////////////////////////////////////////////////////////////

// 泛型约束：让泛型继承一个接口，使泛型上具有某个属性
interface Test {
  key: number
}

function logging<L extends Test>(arg: L): L {
  console.log(arg.key)
  return arg
}
////////////////////////////////////////////////////////////////////
// keyof 关键词
interface Person {
  name: string
  age: number
  sex: string
}

type K1 = keyof Person
type K2 = keyof Person[]

//示例：
function getPropFromObj<O, K extends keyof O>(obj: O, key: K) {
  return obj[key]
}

getPropFromObj({ a: 1, b: 2, c: 3 }, 'a')
////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
