type IsEqual<A, B> = (<S>() => S extends A ? 1 : 0) extends <S>() => S extends B ? 1 : 0
  ? true
  : false

type FindIndex<Arr extends any[], Target, Path extends any[] = []> = Arr extends [
  infer L,
  ...infer R
]
  ? IsEqual<L, Target> extends true
    ? Path['length']
    : FindIndex<R, Target, [...Path, 1]>
  : -1 // your code here

type A = [any, never, 1, '2', true]
type B = FindIndex<A, 1>
type C = FindIndex<A, 3> // -1
type D = FindIndex<A, never> // 1
type E = FindIndex<A, any> // 1

export {}
// 构造数组来记录当前迭代到了哪一项，这样匹配到之后就能返回长度，就是索引值。
// 另外比配每一项的时候用之前的 IsEqual的方式，这样能避免元素里有联合类型导致的错误。
