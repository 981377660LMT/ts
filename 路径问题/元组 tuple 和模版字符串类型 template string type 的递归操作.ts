type StringOrNumber = string | number
// // Tuple 就是 length 固定，每一个元素类型也固定的 Array
type Test1 = ['names', number, 'firstName', 'lastName']

// 元组join成字符串
type Join<T extends unknown[], Sep extends string> = T extends [infer Single] // 用于判断 T 是否已经是最简单的只有一个元素的 Tuple
  ? // 如果是递归基，则提取出 Single 的具体类型
    Single extends StringOrNumber
    ? `${Single}`
    : never
  : // 如果还未到递归基，则继续递归
  T extends [infer First, ...infer Rest]
  ? First extends StringOrNumber
    ? `${First}${Sep}${Join<Rest, Sep>}`
    : never
  : never

type Path = Join<Test1, '.'> // `names.${number}.firstName.lastName`

// 字符串split 成元组
type Test2 = `names.${number}.firstName.lastName.${number}`

type Split<T extends string, S extends string> = T extends `${infer First}${S}${infer Second}`
  ? [First, ...Split<Second, S>]
  : T extends ''
  ? []
  : [T]

type Raw = Split<Test2, '.'>

// type aas = [] extends string[] ? true : false

export type { Join, Split }
