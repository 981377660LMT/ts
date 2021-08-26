type PString1 = ''
type PString2 = '+85%'
type PString3 = '-85%'
type PString4 = '85%'
type PString5 = '85'

type R1 = PercentageParser<PString1> // expected ['', '', '']
type R2 = PercentageParser<PString2> // expected ["+", "85", "%"]
type R3 = PercentageParser<PString3> // expected ["-", "85", "%"]
type R4 = PercentageParser<PString4> // expected ["", "85", "%"]
type R5 = PercentageParser<PString5> // expected ["", "85", ""]

type Num = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type Operation = '+' | '-'
type PercentageParser<S, Groups extends string[] = [], GroupIndex = 0> = GroupIndex extends 0
  ? S extends `${infer L}${infer R}`
    ? L extends Operation
      ? PercentageParser<R, [L], 1>
      : PercentageParser<S, [''], 1>
    : PercentageParser<S, ['', ''], 2>
  : GroupIndex extends 1
  ? S extends `${infer L}${infer R}`
    ? L extends Num
      ? PercentageParser<R, [Groups[0], `${Groups[1] extends string ? Groups[1] : ''}${L}`], 1>
      : PercentageParser<S, [Groups[0], Groups[1] extends string ? Groups[1] : ''], 2>
    : PercentageParser<S, [Groups[0], Groups[1] extends string ? Groups[1] : ''], 2>
  : GroupIndex extends 2
  ? S extends `${infer L}`
    ? L extends '%'
      ? [Groups[0], Groups[1], '%']
      : [Groups[0], Groups[1], '']
    : [Groups[0], Groups[1], '%']
  : never
