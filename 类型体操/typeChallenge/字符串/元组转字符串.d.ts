type TupleToString<T extends string[]> = T extends [infer L, ...infer R]
  ? `${L}${TupleToString<R>}`
  : '' // your code here
type A = TupleToString<['a']> // 'a'
type B = TupleToString<['B', 'F', 'E']> // 'BFE'
type C = TupleToString<[]> // ''

// 这种写法在BFE报错 因为需要类型守卫
type TupleToString<T extends string[]> = T extends [infer L, ...infer R]
  ? L extends string
    ? R extends string[]
      ? `${L}${TupleToString<R>}`
      : ''
    : ''
  : '' // your code here
type A = TupleToString<['a']> // 'a'
type B = TupleToString<['B', 'F', 'E']> // 'BFE'
type C = TupleToString<[]> // ''
