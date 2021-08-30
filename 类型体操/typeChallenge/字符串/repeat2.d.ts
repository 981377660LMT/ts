type MakeArray<Length extends number, Result extends any[] = []> = Result['length'] extends Length
  ? Result
  : MakeArray<Length, [...Result, 1]>

type Helper<T extends any, Arr extends any[], Res extends any[] = []> = Arr extends [
  infer L,
  ...infer R
]
  ? Helper<T, R, [T, ...Res]>
  : Res

type Repeat<T, C extends number> = Helper<T, MakeArray<C>> // your code here

type A = Repeat<number, 3> // [number, number, number]
type B = Repeat<string, 2> // [string, string]
type C = Repeat<1, 1> // [1, 1]
type D = Repeat<0, 0> // []

export {}
