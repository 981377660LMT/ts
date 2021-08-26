type Test = '123'
type Result = StringToUnion<Test> // expected to be "1" | "2" | "3"

type StringToUnion<Str extends string> = Str extends `${infer L}${infer R}`
  ? L | StringToUnion<R>
  : never
export {}
