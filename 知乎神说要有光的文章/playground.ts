// 类型体操顺口溜
// 模式匹配做提取，重新构造做变换。
// 递归复用做循环，数组长度做计数。
// 联合分散可简化，特殊特性要记清。
// 基础扎实套路熟，类型体操可通关。

;`1.模式匹配做提取(infer)`
// TypeScript 类型的模式匹配是通过类型 extends 一个模式类型，
// 把需要提取的部分放到通过 infer 声明的局部变量里，
// 后面可以从这个局部变量拿到类型做各种后续处理。
interface Instance {
  name: string
}

// 构造器
interface InstanceConstructor {
  new (name: string): Instance
}

type GetInstanceType<Constructor extends abstract new (...args: any[]) => any> =
  Constructor extends abstract new (...args: any[]) => infer Instance ? Instance : never

type TestGetInstanceType = GetInstanceType<InstanceConstructor>
;`2.重新构造做变换(索引重映射 as 运算符)`
type Tuple = [one: string, two?: number]

type MapType<T> = {
  [Key in keyof T as `${Key & string}`]: [T[Key], T[Key]]
  // 如果不加& string：
  // 不能将类型“string | number | symbol”分配给类型“string | number | bigint | boolean | null | undefined”。
}

type TestMapType = MapType<{ a: 11 }>

// 递归infer
type Zip<Arr1 extends unknown[], Arr2 extends unknown[]> = Arr1 extends [infer A, ...infer Arr1Rest]
  ? Arr2 extends [infer B, ...infer Arr2Rest]
    ? [[A, B], ...Zip<Arr1Rest, Arr2Rest>]
    : []
  : []

type TestZip = Zip<['a', 'b', 'c', 'd'], [96, 97, 98, 99]>
;`3.递归复用做循环(dfs)`
// 数量不确定，条件反射的就要想到递归。
;`4.数组长度做计数`
;`5.联合分散可简化(笛卡尔积product)`
// BEM
type BEM<
  Block extends string,
  Element extends string[],
  Modifiers extends string[]
> = `${Block}__${Element[number]}--${Modifiers[number]}`
type TestBEM = BEM<'block', ['element', 'element2'], ['modifier', 'modifier2']>
// TypeScript 对联合类型在条件类型中使用时的特殊处理：
// 会把联合类型的每一个元素单独传入做类型计算，最后合并
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never
type TestIsUnion = IsUnion<string | number>

type PermTwo<A extends string, B extends string> = A | B | `${A}${B}` | `${B}${A}`
type PermAll<A extends string, B extends string = A> = A extends A
  ? PermTwo<A, PermAll<Exclude<B, A>>>
  : never
type TestPermAll = PermAll<'a' | 'b' | 'c'>
;`6.特殊特性要记清`
export {}
