import type { Add as AddOneDigit } from './Add'

type DigitRangeMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
// type Digit = DigitRangeMap[number]
type ToDigit<S extends string> = S extends keyof DigitRangeMap ? DigitRangeMap[S] : never
/**
 * @description 考虑到后面方便逐位相加，所以结果处理成倒序。
 */
type ToDigitList<S extends string, Res extends any[] = []> = S extends `${infer First}${infer Rest}`
  ? ToDigitList<Rest, [ToDigit<First>, ...Res]>
  : Res

// debug
type Test1 = ToDigitList<'1234'> // [4, 3, 2, 1]

// debug
type Test2 = AddOneDigit<9, 8> // 17

// 处理进位
type RoundMap = {
  10: 0
  11: 1
  12: 2
  13: 3
  14: 4
  15: 5
  16: 6
  17: 7
  18: 8
  19: 9
}

type Carry<NewSum extends number, Res extends number[] = []> = NewSum extends keyof RoundMap
  ? [1, [RoundMap[NewSum], ...Res]]
  : [0, [NewSum, ...Res]]

type Test3 = Carry<15, [3, 2, 1]> // [1, [5, 3, 2, 1]]

// 多位数相加
type IncMap = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

type Shift<T extends any[]> = T extends [infer First, ...infer Rest] ? Rest : never

type AddDigitList<
  Arr1 extends any[],
  Arr2 extends any[],
  Res extends [0 | 1, number[]] = [0, []]
> = Arr1['length'] extends 0
  ? Arr2['length'] extends 0
    ? // A为空, B为空,处理最后的carry
      Res[0] extends 1
      ? AddDigitList<[1], [], [0, Res[1]]>
      : Res[1]
    : // A为空, B非空
      AddDigitList<Arr1, Shift<Arr2>, Carry<AddOneDigit<Arr2[0], Res[0]>, Res[1]>>
  : Arr2['length'] extends 0
  ? // A非空, B为空
    AddDigitList<Shift<Arr1>, Arr2, Carry<AddOneDigit<Arr1[0], Res[0]>, Res[1]>>
  : // A非空, B非空
    AddDigitList<
      Shift<Arr1>,
      Shift<Arr2>,
      Carry<
        Res[0] extends 0 ? AddOneDigit<Arr1[0], Arr2[0]> : IncMap[AddOneDigit<Arr1[0], Arr2[0]>],
        Res[1]
      >
    >

// debug
// 51 加 52
type Test4 = AddDigitList<[2, 5], [1, 5]> // [1,0,3]

// Number[] -> String
type StrDigitRangeMap = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

type DigitListToString<T extends any[], R extends string = ''> = T extends [
  infer First,
  ...infer Rest
]
  ? DigitListToString<Rest, `${R}${First extends number ? StrDigitRangeMap[First] : 'n'}`>
  : R

type Add<A extends string, B extends string> = DigitListToString<
  AddDigitList<ToDigitList<A>, ToDigitList<B>>
>

// debug
type result = Add<
  '1248859103109591728912488591031095917289',
  '32481239839485789343248123983948578934'
>
