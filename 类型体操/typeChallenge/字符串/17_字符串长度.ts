type LengthOfString<S extends string, T extends any[] = []> = S extends `${infer L}${infer R}`
  ? LengthOfString<R, [...T, L]>
  : T['length']

type L = LengthOfString<'asas'>

// false
type FF1 = '' extends `${infer F}${infer R}` ? true : false
// true
type FF11 = '' extends `${infer F}` ? true : false
// true
type FF2 = 'k' extends `${infer F}${infer R}` ? true : false
