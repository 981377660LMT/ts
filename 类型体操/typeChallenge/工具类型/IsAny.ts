// unkonw 只能赋值给 unkonw 或者 any
// any 除了可以赋值给 unkonw 外还可以赋值给 其它值(除了never)
type IsAny<T> = [unknown] extends [T] ? ([T] extends [string] ? true : false) : false

type Test1 = IsAny<string>
type Test2 = IsAny<any>

export {}
