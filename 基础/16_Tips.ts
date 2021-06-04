function twoParams(a: number, b: number) {
  return a + b
}

let curryOne = twoParams.bind(null, 123)
curryOne(456) // ok
// curryOne('456')

/////////////////////////////////////////////////////////
// 以下结构在应用中很常见：
function foo1() {
  let someProperty

  // 一些其他的初始化代码

  function someMethod() {
    // 用 someProperty 做一些事情
    // 可能有其他属性
  }

  // 可能有其他的方法
  return {
    someMethod,
    // 可能有其他方法
  }
}
// 它被称为模块模式（利用 JavaScript 的闭包）。

// 尽管我并不是一个特别喜欢使用继承的人，但是我确实发现让开发者使用类，可以在一定程度上更好的组织他们的代码，例如
class Foo {
  public someProperty = 1

  constructor() {
    // 一些初始化内容
  }

  public someMethod() {
    // ..code
  }

  public someUtility() {
    // .. code
  }
}

export = new Foo()
/////////////////////////////////////////////////////
// export default 被认为是有害的
// 默认导出的可发现性非常差，你不能智能的辨别一个模块它是否有默认导出，主要是没有自动完成功能。
