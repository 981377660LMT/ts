type Arr1 = [string]
type RA = Readonly<Arr1>

type Arr2 = string[]
type RB = Readonly<Arr2>

type IsExtends<T, Y> = T extends Y ? true : false

type AExtendsRA = IsExtends<Arr1, RA> //true

type RAExtendsA = IsExtends<RA, Arr1> //false

type BExtendsRA = IsExtends<Arr2, RB> // true

type RBExtendsB = IsExtends<RB, Arr2> // false

type C = {
  name: string
}
type RC = Readonly<C>
type CExtendsRC = IsExtends<C, RC> // true
type RCExtendsC = IsExtends<RC, C> // true
// 总结:数组/primitive加上 readonly 为普通形式父集
// 对象属性的 redonly 不影响类型兼容
