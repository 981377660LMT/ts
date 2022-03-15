// recursive conditional typess

const parenthesis = ['(', ')'] as const

type AllParenthesisType = typeof parenthesis[number]

type Decrement = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

type RepeatString<S extends string, N extends number> = N extends 1
  ? S
  : `${S}${RepeatString<S, Decrement[N]>}`

type ParenthesisString = RepeatString<'a' | 'b' | 'c', 3>

export {}
