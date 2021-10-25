type Perm = Permutation<'A' | 'B' | 'C'> // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']

// 1.[Remain] extends [never]表示回溯终点
// 2.Remain extends Remain 表示对于每种可能遍历
type Permutation<Union, Remain = Union> = [Remain] extends [never]
  ? []
  : Remain extends Remain
  ? [Remain, ...Permutation<Exclude<Union, Remain>>]
  : never
