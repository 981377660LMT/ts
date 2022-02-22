// 重映射
// 重映射就是在索引后加一个 as 语句，表明索引转换成什么，它可以用来对索引类型做过滤和转换。
type FilterString<T extends Record<any, any>> = {
  [Key in keyof T as T[Key] extends string ? Key : never]: T[Key]
}

type Getters<T extends Record<any, any>> = {
  [Key in keyof T as `get${Capitalize<Key & string>}`]: T[Key]
}

// key 和 value 的互换
type Flip<T extends Record<any, any>> = {
  [Key in keyof T as `${T[Key]}`]: Key
}
