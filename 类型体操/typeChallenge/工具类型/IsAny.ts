// unkonw 只能赋值给 unkonw 或者 any
// any 除了可以赋值给 unkonw 外还可以赋值给 其它值(除了never)
type IsAny<T> = [unknown] extends [T] ? ([T] extends [string] ? true : false) : false
// 利用任何类型和any交叉都等于any来实现。
type IsAny2<T> = 0 extends 1 & T ? true : false

type Test1 = IsAny<string>
type Test2 = IsAny2<any>

export { IsAny }
