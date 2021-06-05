type T1_ = NonNullable<string[] | null | undefined> // string[]

// Parameters<Type>
// 由函数类型 Type 的参数类型来构建出一个元组类型。
declare function f1(arg: { a: number; b: string }): void
type T3_ = Parameters<typeof f1>

// ConstructorParameters<Type>
type T0 = ConstructorParameters<ErrorConstructor>
//    [message?: string | undefined]
type T1 = ConstructorParameters<FunctionConstructor>
//    string[]
type T2 = ConstructorParameters<RegExpConstructor>
//    [pattern: string | RegExp, flags?: string | undefined]
type T3 = ConstructorParameters<any>
//   unknown[]

// ReturnType<Type>
// 由函数类型 Type 的返回值类型构建一个新类型
type Foo = ReturnType<<T extends U, U extends number[]>() => T> // number[]

// InstanceType<Type>
class C {
  x = 0
  y = 0
}
type T0_ = InstanceType<typeof C> // C

type foo = HTMLElement extends object ? 'yes' : 'no'
export default 1
