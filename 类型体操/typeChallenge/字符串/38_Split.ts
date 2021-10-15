// 字符串split 成元组
type Test2 = `names.${number}.firstName.lastName.${number}`

type Split<T extends string, S extends string> = T extends `${infer First}${S}${infer Second}`
  ? [First, ...Split<Second, S>]
  : T extends ''
  ? []
  : [T]

type Raw = Split<Test2, '.'>

export {}
