// type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]

// type Flatten<T extends any[]> = T extends [infer Head, ...infer Tail]
//   ? [...(Head extends any[] ? Flatten<Head> : [Head]), ...Flatten<Tail>]
//   : T

type Flat<T extends any[]> = T extends [infer L, ...infer R]
  ? [...(L extends any[] ? Flat<L> : [L]), ...Flat<R>]
  : []

type A = Flat<[1, 2, 3]> // [1,2,3]
type B = Flat<[1, [2, 3], [4, [5, [6]]]]> // [1,2,3,4,5,6]
type C = Flat<[]> // []

export {}
