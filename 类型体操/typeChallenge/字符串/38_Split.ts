// 字符串split 成元组
type Test2 = `names.${number}.firstName.lastName.${number}`

type Split<T extends string, S extends string> = T extends `${infer First}${S}${infer Second}`
  ? [First, ...Split<Second, S>]
  : T extends ''
  ? []
  : [T]

type Raw = Split<Test2, '.'>

export {}
// 这题只要会用 ${infer X}${S}${infer Y} 这种写法就很方便了，意思是将一个字符串做拆解：
