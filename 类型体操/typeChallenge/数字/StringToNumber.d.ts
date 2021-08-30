type MakeArray<
  Length extends string,
  Result extends any[] = []
> = `${Result['length']}` extends Length ? Result : MakeArray<Length, [...Result, 1]>

type Helper<A extends any[]> = A['length']

type ToNumber<T extends string> = Helper<MakeArray<T>>

type A = ToNumber<'1'> // 1
type B = ToNumber<'40'> // 40
type C = ToNumber<'0'> // 0
