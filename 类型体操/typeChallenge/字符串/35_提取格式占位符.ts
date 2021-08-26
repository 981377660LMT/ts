type ControlsMap = {
  c: 'char'
  s: 'string'
  d: 'dec'
  o: 'oct'
  h: 'hex'
  f: 'float'
  p: 'pointer'
}

export {}
type Test = ParsePrintFormat<'The result is %d.'>

type ParsePrintFormat<
  S extends string,
  T extends any[] = []
> = S extends `${string}%${infer M}${infer R}`
  ? M extends keyof ControlsMap
    ? ParsePrintFormat<R, [...T, ControlsMap[M]]>
    : ParsePrintFormat<R, [...T]>
  : T
