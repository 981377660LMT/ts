type MakeArray<
  Length extends string,
  Result extends any[] = []
> = `${Result['length']}` extends Length ? Result : MakeArray<Length, [...Result, 1]>

type Helper<T extends string, A extends any[]> = A extends [infer L, ...infer R]
  ? `${T}${Helper<T, R>}`
  : ''

type RepeatString<T extends string, C extends number> = Helper<T, MakeArray<`${C}`>> // your code here

type A = RepeatString<'a', 3> // 'aaa'
type B = RepeatString<'a', 0> // ''

export {}
