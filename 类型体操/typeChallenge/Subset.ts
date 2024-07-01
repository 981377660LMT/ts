type Subset<T extends unknown[]> = T extends [infer F, ...infer R extends unknown[]] ? Subset<R> | [F, ...Subset<R>] : T

type TestSubset = Subset<[1, 2, 3]> // expected to be [[], [1], [2], [3], [1, 2], [2, 3], [1, 3], [1, 2, 3]]
