type JoinString<J extends string, T extends string[], S extends string = ''> = T extends [
  infer F,
  ...infer R
]
  ? F extends string
    ? R extends string[] // 后面还有吗
      ? S extends '' // 是开头吗
        ? JoinString<J, R, `${F}`>
        : JoinString<J, R, `${S}${J}${F}`>
      : `${S}${J}${F}`
    : S
  : S

type TestStr = JoinString<'.', ['a', 'b']>

declare function join<J extends string>(
  delimiter: J
): <T extends string[]>(...parts: T) => JoinString<J, T>

const hyphenJoiner = join('-')
const result = hyphenJoiner('a', 'b', 'c') // = 'a-b-c'
