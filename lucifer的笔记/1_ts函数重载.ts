// interface 内的key带括号是函数声明
// ts 的函数重载和 c++、java 等语言中的函数重载不一样。ts 函数重载最终，还是编译成一个函数（c 语言等是编译成不同函数）。
// 它的目的仅仅是提供编译器进行更多种类的类型判断，而不需要使用“类型断言”技术。
interface SearchFunc {
  (source: string, subString: string): boolean
}

const a: SearchFunc = (source: string, subString: string) => true

a('', '')

// interface重载函数
// 越具体的类型，应该定义在越前面。这样有利于 TypeScript 编译器推断出更准确的类型。
interface ReadonlyArray<T> {
  reduce(
    callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T
  ): T
  reduce(
    callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T,
    initialValue: T
  ): T
  reduce<U>(
    callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: readonly T[]) => U,
    initialValue: U
  ): U
}
let arr: ReadonlyArray<number> = []
arr.reduce((pre, cur) => pre)
arr.reduce((pre, cur) => pre, 1)
arr.reduce<number>((pre, cur) => pre, 1)

// 一、函数重载让编译器根据函数的输入决定函数的输出，从而推断出更准确的类型。
// 二、最后一个签名要包含前面所有签名的情况，并且它不在重载列表内。
// 三、在定义多个重载方法时，越具体的签名应该定义在越前面。
export {}
