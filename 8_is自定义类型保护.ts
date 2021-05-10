interface Foo {
  foo: number
  common: string
}

interface Bar {
  bar: number
  common: string
}

// 用户自己定义的类型保护！
const isFoo = (arg: Foo | Bar): arg is Foo => (arg as Foo).foo !== undefined

// 用户自己定义的类型保护使用用例：
function doStuff(arg: Foo | Bar) {
  if (isFoo(arg)) {
    console.log(arg.foo) // ok
    // console.log(arg.bar) // Error
  } else {
    // console.log(arg.foo) // Error
    console.log(arg.bar) // ok
  }
}
