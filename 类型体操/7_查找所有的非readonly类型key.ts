import { IfEquals } from './7_判断X和Y是否类型相同的辅助类型'

type MutableKeys<T extends object> = {
  // 逻辑：如果该属性去除readonly与原来相等，则返回该属性的key
  [K in keyof T]: IfEquals<{ [Q in K]: T[K] }, { -readonly [Q in K]: T[K] }, K>
}[keyof T]

type Bar = MutableKeys<{ readonly a: 1; b: 2; c: 3 }>

// 去掉只读属性
// type RemoveReadonly<T> = {
//   -readonly [P in keyof T]: T[P]
// }
