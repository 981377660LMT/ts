type Result = RequiredKeys<{ foo: number; bar?: string }>
// expected to be “foo”

export {}
type RequiredKeys<T> = keyof {
  [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K]
}
