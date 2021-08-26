// 利用{} extends {当前key: 类型}判断是否是可选类型。
type OptionalKeys<T extends object> = {
  [K in keyof T]: {} extends Pick<T, K> ? K : never
}[keyof T]

type Eg = OptionalKeys<{ key1?: string; key2: number }>

// Eg2 = false
type Eg3 = {} extends { key1: string } ? true : false
// Eg3 = true
type Eg4 = {} extends { key1?: string } ? true : false

export {}
