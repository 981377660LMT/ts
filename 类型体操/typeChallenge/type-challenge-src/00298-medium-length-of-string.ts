// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>
]

// ============= Your Code Here =============
type LengthOfString<S extends string> = StringToTuple<S>['length']
type StringToTuple<S extends string, Res extends unknown[] = []> = S extends `${infer R1}${infer R2}` ? StringToTuple<R2, [...Res, R1]> : Res
