// 可调用的
interface Overloaded {
  (foo: string): string
  (foo: number): number
}

// 实现接口的一个例子：
function stringOrNumber(foo: number): number
function stringOrNumber(foo: string): string
function stringOrNumber(foo: any): any {
  if (typeof foo === 'number') {
    return foo * foo
  } else if (typeof foo === 'string') {
    return `hello ${foo}`
  }
}

const overloaded: Overloaded = stringOrNumber

// 可实例化的
interface CallMeWithNewToGetString {
  new (): string
}

// 使用
declare const Foo: CallMeWithNewToGetString
const barrr = new Foo() // bar 被推断为 string 类型
