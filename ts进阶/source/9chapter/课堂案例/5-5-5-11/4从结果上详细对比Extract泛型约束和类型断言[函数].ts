

type func1 = (one: number, two: string) => string
type func2 = (one: number) => string

// 函数的泛型约束
// 函数类型上的泛型约束 参数类型和返回值完全相同的情况下，
//  参数少的函数类型 extends 参数多的函数类型 返回true
//  参数多的函数类型 extends 参数少的函数类型 返回false
type beginType1 = func1 extends func2 ? func1 : never// never
type beginType2 = func2 extends func1 ? func2 : never// never

type extractType1 = Extract<func1, func2>//never
type extractType2 = Extract<func2, func1>//= (one: number) => string


export { }