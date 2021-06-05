// 全局变量 myLib 包含一个用于创建祝福的 makeGreeting 函数， 以及表示祝福数量的 numberOfGreetings 属性。
declare namespace myLib {
  function makeGreeting(s: string): string
  let numberOfGreetings: number
}

let result = myLib.makeGreeting('hello, world')
console.log('The computed greeting is:' + result)

let count = myLib.numberOfGreetings
