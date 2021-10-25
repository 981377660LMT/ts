type Person = {
  id: string
  name: string
  age: number
  from?: string
  speak?: string
}

type OptionalKeys<T> = {
  [K in keyof T]: Pick<T, K> extends Required<Pick<T, K>> ? never : K
}[keyof T] // 你的实现代码
type PersonOptionalKeys = OptionalKeys<Person> // "from" | "speak"
