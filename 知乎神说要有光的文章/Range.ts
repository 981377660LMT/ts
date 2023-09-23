// 在 TypeScript 中生成数字范围的字面量类型
// 从 TS 4.5 开始， 尾递归 PR范围可以是numbers0 到 999。
type MAXIMUM_ALLOWED_BOUNDARY = 256

type Range<N extends number, Result extends Array<unknown> = []> = Result['length'] extends N ? Result : Range<N, [...Result, Result['length']]>

type Octal = Range<MAXIMUM_ALLOWED_BOUNDARY>[number] // 0 - 255

type Digits = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

type AlphaChanel = `0.${Range<999>[number]}` | '1.0'

type AssertAlpha<Alpha extends number> = `${Alpha}` extends AlphaChanel ? Alpha : never

type RGBA<Alpha extends number = 1.0> = [Octal, Octal, Octal, AssertAlpha<Alpha>?]

const rgb: RGBA = [255, 67, 89] // ok
const rgb2: RGBA = [256, 67, 89] //error, 255 is out of range
const rgba: RGBA<0.25> = [245, 67, 34, 0.25] // ok

//
//
type ComputeRange<N extends number, Result extends Array<unknown> = []> = Result['length'] extends N
  ? Result
  : ComputeRange<N, [...Result, Result['length']]>

type Add<A extends number, B extends number> = [...ComputeRange<A>, ...ComputeRange<B>]['length']

type IsGreater<A extends number, B extends number> = IsLiteralNumber<[...ComputeRange<B>][Last<[...ComputeRange<A>]>]> extends true ? false : true

type Last<T extends any[]> = T extends [...infer _, infer Last] ? (Last extends number ? Last : never) : never

type RemoveLast<T extends any[]> = T extends [...infer Rest, infer _] ? Rest : never

type IsLiteralNumber<N> = N extends number ? (number extends N ? false : true) : false

type AddIteration<Start extends number, Stop extends number, Step extends number, Result extends Array<unknown> = [Start]> = IsGreater<
  Last<Result>,
  Stop
> extends true
  ? RemoveLast<Result>
  : AddIteration<Start, Stop, Step, [...Result, Add<Last<Result>, Step>]>

// [5, 13, 21, 29, 37]
type Result = AddIteration<5, 40, 2>

// https://catchts.com/undocumented-features
