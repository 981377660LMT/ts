type case1 = IsUnion<string> // false
type case2 = IsUnion<string | number> // true
type case3 = IsUnion<[string | number]> // false

type IsUnion1<T, U = T> = U extends U ? ([Exclude<T, U>] extends [never] ? false : true) : never
// example1:
// type T = string | number
// step1: string | number extends string | number
// step2: string extends string | number => [number] extends [never] => true
// step3: number extends string | number => [string] extends [never] => true
// step4: true | true
// result: true

// example2:
// type T = string
// step1: string extends string
// step2: [never] extends [never] => false
// result: false

// 利用联合类型逆变的特性，如果是联合类型，则发生逆变为交集类型
type IsUnion<T> = (T extends any ? (arg: T) => void : never) extends (arg: infer U) => void
  ? [T] extends [U]
    ? false
    : true
  : never
