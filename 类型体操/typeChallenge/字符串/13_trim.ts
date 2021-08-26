type trimed = TrimRight<TrimLeft<'  Hello World  '>> // expected to be 'Hello World  '

type WhiteSpace = ' ' | '\n' | '\t'

type TrimLeft<Sentence extends string> = Sentence extends `${WhiteSpace}${infer Remain}`
  ? TrimLeft<Remain>
  : Sentence

type TrimRight<Sentence extends string> = Sentence extends `${infer Remain}${WhiteSpace}`
  ? TrimRight<Remain>
  : Sentence

export {}
