type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]

type Flatten<T extends any[]> = T extends [infer Head, ...infer Tail]
  ? [...(Head extends any[] ? Flatten<Head> : [Head]), ...Flatten<Tail>]
  : T
