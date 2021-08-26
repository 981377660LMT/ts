type Sample1 = Anyof<[1, '', false, [], {}]> // expected to be true.
type Sample2 = Anyof<[0, '', false, [], {}]> // expected to be false.

type FalseUnion = false | '' | 0 | Record<PropertyKey, never> | []
type Anyof<T extends readonly any[]> = T extends [infer F, ...infer R]
  ? F extends FalseUnion
    ? Anyof<R>
    : true
  : false

// 注意空对象的表示
type A = { name: string } extends {} ? true : false // true
type C = { name: string } extends Record<PropertyKey, never> ? true : false // false

export {}
