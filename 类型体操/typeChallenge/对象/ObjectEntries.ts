type ObjectToUnion<T extends object> = T[keyof T]
type TupleToUnion<T extends any[]> = T[number]

// 需要强制把对象描述为非可选 Key：
type RemoveUndefined<T> = [T] extends [undefined] ? T : Exclude<T, undefined>

type ObjectEntries<T> = {
  [K in keyof T]-?: [K, RemoveUndefined<T[K]>]
}[keyof T]

type TestObjectEntries = ObjectEntries<{ a: string; b?: number }>
