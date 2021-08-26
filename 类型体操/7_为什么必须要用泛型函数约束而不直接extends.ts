// 答案是：因为对readonly/可选等这些修饰符，真的无能无力了
type IfEquals<X, Y, A, B> = X extends Y ? A : B

/**
 * 还用上面的例子
 */
type T1 = { key1: string }
type T2 = { readonly key1: string }
type T3 = { key1?: string }

// A1 = true
type A1 = IfEquals<T1, T2, true, false>
// A2 = true
type A2 = IfEquals<T1, T3, true, false>

export {}

// 所以必须用 泛型函数 extends 判断
