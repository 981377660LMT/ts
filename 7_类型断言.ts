// 成为文件模块而不是全局模块污染变量
export {}
// TypeScript 是怎么确定单个断言是否足够
// 当 S 类型是 T 类型的子集，或者 T 类型是 S 类型的子集时，S 能被成功断言成 T。
interface Foo {
  foo: number
  bas: string
}

// const foo = <Foo>{}
const foo = {} as Foo
// 更好的方式
// const foo: Foo = {}
foo.foo = 123
foo.bas = 'hello'

function handler1(event: Event) {
  const mouseEvent = event as MouseEvent
}

// 双重断言
function handler2(event: Event) {
  const element = (event as unknown) as HTMLElement // Error: 'Event' 和 'HTMLElement' 中的任何一个都不能赋值给另外一个
}
