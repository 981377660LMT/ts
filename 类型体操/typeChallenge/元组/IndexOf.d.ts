type IsEqual<A, B> = (<S>() => S extends A ? 1 : 0) extends <S>() => S extends B ? 1 : 0
  ? true
  : false

type FindIndex<T extends any[], E, Path extends any[] = []> = T extends [infer L, ...infer R]
  ? IsEqual<L, E> extends true
    ? Path['length']
    : FindIndex<R, E, [...Path, 1]>
  : never // your code here

type A = [any, never, 1, '2', true]
type B = FindIndex<A, 1>
type C = FindIndex<A, 3> // never
type D = FindIndex<A, never> // 1
type E = FindIndex<A, any> // 1

export {}
