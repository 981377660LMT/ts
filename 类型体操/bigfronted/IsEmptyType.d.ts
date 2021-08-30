// 需要排除object ,因为keyof object 也是never
type IsEmptyType<T> = number extends T ? (keyof T extends never ? true : false) : false

type A = IsEmptyType<string> // false
type B = IsEmptyType<{ a: 3 }> // false
type C = IsEmptyType<{}> // true
type D = IsEmptyType<any> // false
type E = IsEmptyType<object> // false
type F = IsEmptyType<Object> // false

type Str = keyof string
type Sym = keyof symbol
type B = keyof bigint
type Num = keyof number
type N = keyof object
type OK = number extends {} ? 1 : 2
type A = keyof any
type A = keyof unknown
type Head = ['a', 'b', 'c'] extends [infer L, ...infer R] ? R : false
