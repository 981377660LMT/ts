type Butterfly = DropChar<' b u t t e r f l y ! ', ' ' | 'b'> // 'utterfly!'

type EqualType<A, B> = A extends B ? true : false
// type StrictEqualType<T, R> = [T] extends [R] ? ([R] extends [T] ? true : false) : false
type DropChar<T extends string, U extends string> = T extends `${infer L}${infer R}`
  ? `${EqualType<L, U> extends true ? '' : L}${DropChar<R, U>}`
  : ''

type Foo = 'a' extends ' ' | 'a' ? true : false
