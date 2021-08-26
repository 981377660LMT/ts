type Zero = MinusOne<1> // 0
type FiftyFour = MinusOne<55> // 54

type MinusOne<N extends number> = PopLength<MakeArray<`${N}`>>

// 思路是使用数组长度模拟
type MakeArray<
  Length extends string,
  Result extends any[] = []
> = `${Result['length']}` extends Length ? Result : MakeArray<Length, [...Result, 1]>

type PopLength<T extends any[]> = T extends [...infer F, number] ? [...F]['length'] : 0

type Test = MakeArray<'30'>

export {}
