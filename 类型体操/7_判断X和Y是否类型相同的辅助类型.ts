/**
 * @desc 一个辅助类型，判断X和Y是否类型相同，
 * @returns 是则返回A，否则返回B
 * @summary IfEquals的基本骨架是type IfEquals<> = (参数1) extends (参数2) ? A : B
 * 原理： Ts编译器会认为如果两个类型（比如这里的X和Y）仅被用于约束两个相同的泛型函数，则是相同的
 */
type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? A
  : B

type Foo = IfEquals<string, string>

export { IfEquals }
/////////////////////////////////////////////////////////////////
// A = <T>() => T extends string ? 1 : 2;
type A = <T>() => T extends string ? 1 : 2
// B = <T>() => T extends number ? 1 : 2;
type B = <T>() => T extends number ? 1 : 2

// C = 2
type C = A extends B ? 1 : 2

/**
 * T2比T1多了readonly修饰符
 * T3比T1多了可选修饰符
 * 这里控制单一变量进行验证
 */
type T1 = { key1: string }
type T2 = { readonly key1: string }
type T3 = { key1?: string }

// A1 = false
type A1 = IfEquals<T1, T2, true, false>
// A2 = false
type A2 = IfEquals<T1, T3, true, false>
