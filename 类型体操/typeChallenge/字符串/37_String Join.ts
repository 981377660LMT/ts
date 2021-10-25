type JoinString<
  Separator extends string,
  Arr extends any[],
  Result extends string = ''
> = Arr extends [infer Head, ...infer Next]
  ? Result extends ''
    ? JoinString<Separator, Next, `${Head}`>
    : JoinString<Separator, Next, `${Result}${Separator}${Head}`>
  : Result

type TestStr = JoinString<'.', ['a', 'b']>

declare function join<J extends string>(
  delimiter: J
): <T extends string[]>(...parts: T) => JoinString<J, T>

const hyphenJoiner = join('-')
const result = hyphenJoiner('a', 'b', 'c') // = 'a-b-c'
