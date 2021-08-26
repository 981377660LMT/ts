type Test = CamelCase<'foo-bar-baz'> // 'fooBarBaz'

type CamelCase<S extends string> = S extends `${infer Head}-${infer Rest}`
  ? `${Head}${CamelCase<Capitalize<Rest>>}`
  : S
