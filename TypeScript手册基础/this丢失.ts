// class Foo {
//   x = 3
//   print() {
//     console.log('x is ' + this.x)
//   }
// }

// var f = new Foo()
// f.print() // Prints 'x is 3' as expected

// // Use the class method in an object literal
// var z = { x: 10, p: f.print }
// z.p() // Prints 'x is 10'

// var p = z.p
// p() // Prints 'x is undefined'

export default 0
///////////////////////////////////////////////
// 修复
// 可以通过一些方法来保持 this 的上下文。

// #使用实例函数
// 代替 TypeScript 里默认的_原型_方法，你可以使用一个_实例箭头函数_来定义类成员：
class MyClass {
  private status = 'blah'

  public run = () => {
    // <-- note syntax here
    console.log(this.status)
  }
}
const x = new MyClass().run
x()
// 好与坏：这会为每个类实例的每个方法创建额外的闭包。如果这个方法通常是正常调用的，那么这么做有点过了。然而，它经常会在回调函数里调用，让类实例捕获到 this 上下文会比在每次调用时都创建一个闭包来得更有效率一些。
// 好：其它外部使用者不可能忘记处理 this 上下文
// 好：在 TypeScript 里是类型安全的
// 好：如果函数带参数不需要额外的工作
// 坏：派生类不能通过使用 super 调用基类方法
// 坏：在类与用户之前产生了额外的非类型安全的约束：明确了哪些方法提前绑定了以及哪些没有

// #箭头函数
// 好与坏：内存 / 效能上的利弊与实例函数相比正相反
// 好：在 TypeScript，100% 的类型安全
// 好：在 ECMAScript 3 里同样生效
// 好：你只需要输入一次实例名
// 坏：你要输出 2 次参数名
// 坏：对于可变参数不起作用（'rest'）

// #Function.bind
// 好与坏：内存 / 效能上的利弊与实例函数相比正相反
// 好：如果函数带参数不需要额外的工作
// 坏：目前在 TypeScript 里，不是类型安全的
// 坏：只在 ECMAScript 5 里生效
// 坏：你要输入 2 次实例名
