// type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]

type Flatten<T extends any[]> = T extends [infer Head, ...infer Tail]
  ? Head extends any[]
    ? [...Flatten<Head>, ...Flatten<Tail>]
    : [Head, ...Flatten<Tail>]
  : T

type Flat<T extends any[]> = {
  [K in keyof T]: T[K] extends any[] ? Flat<T[K]> : T[K]
}[number]

type A = Flat<[1, 2, 3]> // [1,2,3]
type B = Flatten<[1, [2, 3], [4, [5, [6]]]]> // [1,2,3,4,5,6]
type C = Flat<[]> // []

export {}
