// same type will be merged automatically
type StringToUnion<T extends string> = T extends `${infer H}${infer R}`
  ? H | StringToUnion<R>
  : never

type Test = '123'
type Result = StringToUnion<Test> // expected to be "1" | "2" | "3"

export {}
