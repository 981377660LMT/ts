type trimed = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '

type WhiteSpace = ' ' | '\n' | '\t'

type TrimLeft<Sentence extends string> = Sentence extends `${WhiteSpace}${infer Remain}`
  ? TrimLeft<Remain>
  : Sentence

export {}
