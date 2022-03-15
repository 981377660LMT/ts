// JavaScript 在一个对象类型的索引签名上会隐式调用 toString 方法，而在 TypeScript
//  stackoverflow 上有很多 JavaScript 使用者都会这样。），它将会抛出一个错误。
const obj = {
  toString() {
    return 'Hello'
  },
}

const foo: any = {}

// ERROR: 索引签名必须为 string, number....
// foo[obj] = 'World'

// FIX: TypeScript 强制你必须明确这么做：强制用户必须明确的写出 toString()
// 强制用户必须明确的写出 toString() 的原因是：在对象上默认执行的 toString 方法是有害的。
foo[obj.toString()] = 'World'

// TypeScript 的索引签名必须是 string 或者 number。

// symbols 也是有效的

// 使用一组有限的字符串字面量
type Index = 'a' | 'b' | 'c'
type FromIndex = { [k in Index]?: number }

const good: FromIndex = { b: 1, c: 2 }

type FromSomeIndex<K extends string> = { [key in K]: number }

// string 类型的索引签名比 number 类型的索引签名更严格。
interface ArrStr {
  [key: string]: string | number // 必须包括所用成员类型
  [index: number]: string // 字符串索引类型的子级

  // example
  length: number
}

interface NestedCSS {
  color?: string
  nest?: {
    [selector: string]: NestedCSS
  }
}

const example: NestedCSS = {
  color: 'red',
  nest: {
    '.subclass': {
      color: 'blue',
    },
  },
}

const failsSliently: NestedCSS = {}
// colour: 'red'  // TS Error: 未知属性 'colour'

const colors = {
  red: 'red',
  blue: 'blue',
}

type Colors = keyof typeof colors

let color: Colors // color 的类型是 'red' | 'blue'
color = 'red' // ok
color = 'blue' // ok
// color = 'anythingElse'; // Error

export default 1
