export {}

type StringOrNumber = string | number
// // Tuple 就是 length 固定，每一个元素类型也固定的 Array
type Test1 = ['names', number, 'firstName', 'lastName']

// 元组join成字符串
type Join<L extends readonly StringOrNumber[], T extends StringOrNumber> = L extends [
  infer F,
  ...infer R
]
  ? F extends StringOrNumber
    ? R extends readonly StringOrNumber[]
      ? R['length'] extends 0
        ? F
        : `${F}${T}${Join<R, T>}`
      : never
    : never
  : ''

type Path = Join<Test1, '.'>
