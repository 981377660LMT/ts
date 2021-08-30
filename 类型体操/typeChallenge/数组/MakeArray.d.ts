// type MakeArray<
//   Length extends string,
//   Result extends any[] = []
// > = `${Result['length']}` extends Length ? Result : MakeArray<Length, [...Result, 1]>

type MakeArray<Length extends number, Result extends any[] = []> = Result['length'] extends Length
  ? Result
  : MakeArray<Length, [...Result, 1]>

type Zero = MakeArray<0>
type One = MakeArray<1>

export { MakeArray }
