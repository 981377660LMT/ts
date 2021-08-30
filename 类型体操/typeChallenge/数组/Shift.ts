/**
 * Pop<[1, 2, 3]> = [1, 2].
 */
type Pop<T extends Tuple> = T extends [...infer Head, infer Last] ? Head : never

/**
 * Shift<[1], [1, 2, 3]> = [2, 3].
 * Shift<[1, 2], [1, 2, 3]> = [3].
 */
type Shift<Shifted extends Tuple, T extends Tuple> = T extends [...Shifted, ...infer Rest]
  ? Rest
  : never

type Tuple = readonly unknown[]

type Test66 = Shift<[1], [1, 2]>

/**
 * Slices<[1, 2, 3]> = [1] | [1, 2] | [1, 2, 3].
 */
type Slices<T extends Tuple> = T extends [] ? never : T | Slices<Pop<T>>

export {}
