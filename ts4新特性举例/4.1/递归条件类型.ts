export {}
type IsString<T> = T extends string ? true : false

type A = IsString<string> // true
type B = IsString<number> // false

// 为了更好的支持类型推断，ts4 在条件类型的基础上又增加了可递归的条件判断，常用递归条件类型模式为：
// type InnerType<T> = T extends WrappedType<infer U> ? InnerType<U> : T
// 比如常见的数组拍平函数 deepFlatten，假设其输入为任意嵌套的未知类型数组，对应的输出为推导的某类型数组，通过递归条件类型表达为：
type ElementType<T> = T extends ReadonlyArray<infer U> ? ElementType<U> : T
declare function deepFlatten<T extends readonly unknown[]>(arr: T): ElementType<T>[]
// 全部返回 'number[]':
deepFlatten([1, 2, 3, 'a', ['a']])
deepFlatten([[1], [2, 3]])
deepFlatten([[1], [[2]], [[[3]]]])

// 再一个经典的例子便是推断 await 语句的返回值类型：
type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
type P1 = Awaited<Promise<string>> // string
type P2 = Awaited<Promise<Promise<string>>> // string
type P3 = Awaited<Promise<string | Promise<Promise<number> | undefined>>> // string | number | undefined
