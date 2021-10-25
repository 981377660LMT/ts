type MakeArray<
  Length extends string,
  Result extends any[] = []
> = `${Result['length']}` extends Length ? Result : MakeArray<Length, [...Result, 1]>

type Helper<A extends any[]> = A['length']

type ToNumber<T extends string> = Helper<MakeArray<T>>

type A = ToNumber<'1'> // 1
type B = ToNumber<'40'> // 40
type C = ToNumber<'0'> // 0
// ts里运算很匮乏，并没有直接的数字运算，这里巧妙的利用了数组长度来实现，通过递归构造数组，使得构造出来的数组长度和期望的匹配
type C = ToNumber<'999'> // 0
// 还是没有完全解决递归的问题, 超过 1000 会报 "Type produces a tuple type that is too large to represent.(2799)"
// (1000时为any)
