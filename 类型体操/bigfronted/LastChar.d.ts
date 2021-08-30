type LastChar<T extends string> = T extends `${infer L}${infer R}`
  ? R extends ''
    ? L
    : LastChar<R>
  : L

type Test = LastChar<'BFE'>
