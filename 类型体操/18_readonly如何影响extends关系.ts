type A = [string]
type RA = Readonly<A>

type B = string[]
type RB = Readonly<B>

type IsExtends<T, Y> = T extends Y ? true : false

type AExtendsRA = IsExtends<A, RA> //true

type RAExtendsA = IsExtends<RA, A> //false

type BExtendsRA = IsExtends<B, RB> // true

type RBExtendsB = IsExtends<RB, B> // false

type C = {
  name: string
}
type RC = Readonly<C>
type CExtendsRC = IsExtends<C, RC> // true
type RCExtendsC = IsExtends<RC, C> // true
// 总结:数组/primitive加上 readonly 为普通形式父集
// 对象属性的 redonly 不影响类型兼容
