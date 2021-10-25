type IsUnion<T, U = T> = T extends any ? ([U] extends [T] ? false : true) : never

type I0 = IsUnion<string | number> // true
type I1 = IsUnion<string | never> // false
type I2 = IsUnion<string | unknown> // false
export {}
