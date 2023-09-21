// 类型体操顺口溜
// 模式匹配做提取，重新构造做变换。
// 递归复用做循环，数组长度做计数。
// 联合分散可简化，特殊特性要记清。
// 基础扎实套路熟，类型体操可通关。

import { IsEqual } from '../type-fest学习笔记/internal'
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

type GetInstanceType<Constructor extends abstract new (...args: any[]) => any> = Constructor extends abstract new (...args: any[]) => infer Instance
  ? Instance
  : never

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
type CamelCase<Str extends string> = Str extends `${infer Left}_${infer Right}${infer Rest}` ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}` : Str

type DropSubStr<Str extends string, SubStr extends string> = Str extends `${infer Prefix}${SubStr}${infer Suffix}`
  ? DropSubStr<`${Prefix}${Suffix}`, SubStr>
  : Str

// 索引重映射 as 运算符
// 除了可以对 Value 做修改，也可以对 Key 做修改，使用 as，这叫做重映射：
type UppercaseKey<Obj extends object> = {
  [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key]
}

// 可以在构造新索引类型的时候根据值的类型做下过滤：
type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
  [Key in keyof Obj as Obj[Key] extends ValueType ? Key : never]: Obj[Key]
}
;`3.递归复用做循环(dfs)`
// 数量不确定，条件反射的就要想到递归。

type ReverseArr<Arr extends unknown[]> = Arr extends [infer First, ...infer Rest] ? [...ReverseArr<Rest>, First] : Arr
type Includes<Arr extends unknown[], FindItem> = Arr extends [infer First, ...infer Rest]
  ? IsEqual<First, FindItem> extends true
    ? true
    : Includes<Rest, FindItem>
  : false

type RemoveItem<Arr extends unknown[], Item, Result extends unknown[] = []> = Arr extends [infer First, ...infer Rest]
  ? IsEqual<First, Item> extends true
    ? RemoveItem<Rest, Item, Result>
    : RemoveItem<Rest, Item, [...Result, First]>
  : Result

// DeepReadonly
type DeepReadonly<Obj extends Record<string, any>> = {
  readonly [Key in keyof Obj]: Obj[Key] extends object ? (Obj[Key] extends Function ? Obj[Key] : DeepReadonly<Obj[Key]>) : Obj[Key]
}
// 为啥这里没有计算呀？
// 因为 ts 的类型只有被用到的时候才会做计算。
// 所以可以在前面加上一段 Obj extends never ? never 或者 Obj extends any 等，从而触发计算：
// 或者simplify类型
type DeepReadonly2<Obj extends Record<string, any>> = Obj extends any
  ? {
      readonly [Key in keyof Obj]: Obj[Key] extends object ? (Obj[Key] extends Function ? Obj[Key] : DeepReadonly2<Obj[Key]>) : Obj[Key]
    }
  : never
;`4.数组长度做计数`
type Mutiply<Num1 extends number, Num2 extends number, ResultArr extends unknown[] = []> = Num2 extends 0
  ? ResultArr['length']
  : Mutiply<Num1, Subtract<Num2, 1>, [...BuildArray<Num1>, ...ResultArr]>

type StrLen<Str extends string, CountArr extends unknown[] = []> = Str extends `${string}${infer Rest}`
  ? StrLen<Rest, [...CountArr, unknown]>
  : CountArr['length']

type FibonacciLoop<
  PrevArr extends unknown[],
  CurrentArr extends unknown[],
  IndexArr extends unknown[] = [],
  Num extends number = 1
> = IndexArr['length'] extends Num ? CurrentArr['length'] : FibonacciLoop<CurrentArr, [...PrevArr, ...CurrentArr], [...IndexArr, unknown], Num>

type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>
;`5.联合分散可简化(笛卡尔积product)`
// BEM
type BEM<Block extends string, Element extends string[], Modifiers extends string[]> = `${Block}__${Element[number]}--${Modifiers[number]}`
type TestBEM = BEM<'block', ['element', 'element2'], ['modifier', 'modifier2']>

// TypeScript 对联合类型在条件类型中使用时的特殊处理：
// !会把联合类型的每一个元素单独传入做类型计算，最后合并
// TypeScript 之所以这样处理联合类型也很容易理解，因为联合类型的每个元素都是互不相关的，不像数组、索引、字符串那样元素之间是有关系的。
// !A extends A 这段看似没啥意义，主要是为了触发分布式条件类型，让 A 的每个类型单独传入。
// [B] extends [A] 这样不直接写 B 就可以避免触发分布式条件类型，那么 B 就是整个联合类型。
//
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never
type TestIsUnion = IsUnion<string | number>

// A 和 B 都是同一个联合类型，为啥值还不一样呢？
// 因为条件类型中如果左边的类型是联合类型，会把每个元素单独传入做计算，而右边不会。
type TestUnion<A, B = A> = A extends A ? { a: A; b: B } : never
type TestUnionResult = TestUnion<'a' | 'b' | 'c'>

type PermTwo<A extends string, B extends string> = A | B | `${A}${B}` | `${B}${A}`
type PermAll<A extends string, B extends string = A> = A extends A ? PermTwo<A, PermAll<Exclude<B, A>>> : never
type TestPermAll = PermAll<'a' | 'b' | 'c'>

type StringToUnion<Str extends string> = Str extends `${infer First}${infer Rest}` ? First | StringToUnion<Rest> : never
;`6.特殊特性要记清`

// any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any，可以用这个特性判断 any 类型。
type IsAny<T> = 1 extends 2 & T ? true : false
// 联合类型作为类型参数出现在条件类型左侧时，会分散成单个类型传入，最后合并。
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never
// never 作为类型参数出现在条件类型左侧时，会直接返回 never。
type IsNever<T> = [T] extends [never] ? true : false
// any 作为类型参数出现在条件类型左侧时，会直接返回 trueType 和 falseType 的联合类型。
type TestAny<T> = T extends number ? 1 : 2
type TestAnyRes = TestAny<any>
// 元组类型也是数组类型，但 length 是数字字面量，而数组的 length 是 number。可以用来判断元组类型。
type IsTuple<T> = T extends [...params: infer Eles] ? NotEqual<Eles['length'], number> : false
// 函数参数处会发生逆变，可以用来实现联合类型转交叉类型。
// 类型之间是有父子关系的，更具体的那个是子类型，比如 A 和 B 的交叉类型 A & B 就是联合类型 A | B 的子类型，因为更具体。
// 父亲抽象，儿子具体。
// 如果允许父类型赋值给子类型，就叫做逆变（抽象可以复制给具体的）。
// 如果允许子类型赋值给父类型，就叫做协变（具体可以复制给抽象的，符合认知）。
// 在 TypeScript 中`函数参数是有逆变的性质`的，如果参数可能是多个类型，参数类型会变成它们的交叉类型。
type UnionToIntersection<U> = (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown ? R : never
// 可选索引的索引可能没有，那 Pick 出来的就可能是 {}，可以用来过滤可选索引，反过来也可以过滤非可选索引。
// {} extends Pick<Obj, Key> 就能过滤出可选索引。可选的意思是指有没有这个索引，而不是索引值是不是可能 undefined。
type GetOptional<Obj extends Record<string, unknown>> = {
  [Key in keyof Obj as {} extends Pick<Obj, Key> ? Key : never]: Obj[Key]
}
// 索引类型的索引为字符串字面量类型，而可索引签名不是，可以用这个特性过滤掉可索引签名。(filter索引/map索引)
type RemoveIndexSignature<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Key extends `${infer Str}` ? Str : never]: Obj[Key]
}
// keyof 只能拿到 class 的 public 的索引，可以用来过滤出 public 的属性。
type ClassPublicProps<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj[Key]
}
// 默认推导出来的不是字面量类型，加上 as const 可以推导出字面量类型，但带有 readonly 修饰，这样模式匹配的时候也得加上 readonly 才行。
// !加上 as const 之后推导出来的类型是带有 readonly 修饰的，所以再通过模式匹配提取类型的时候也要加上 readonly 的修饰才行。
type ReverseArr2<Arr> = Arr extends readonly [infer A, infer B, infer C] ? [C, B, A] : never
const aaa = [1, 2, 3] as const
type ReverseArrRes = ReverseArr2<typeof aaa>

//
//
// 特殊类型的特性
// IsAny
// IsEqual
// IsUnion
// IsNever
// IsTuple
// UnionToIntersection
// GetOptional
// GetRequired
// RemoveIndexSignature
// ClassPublicProps
// as const

export {}
