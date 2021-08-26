type A = Enum<['macOS', 'Windows', 'Linux']>
// -> { readonly MacOS: "macOS", readonly Windows: "Windows", readonly Linux: "Linux" }

type B = Enum<['macOS', 'Windows', 'Linux'], true>
// -> { readonly MacOS: 0, readonly Windows: 1, readonly Linux: 2 }

type Enum<T extends readonly string[], N extends boolean = false> = {
  readonly [P in T[number] as Capitalize<P>]: N extends true ? IndexOf<T, P> : P
}

type IndexOf<T, P, S extends any[] = []> = T extends readonly [infer F, ...infer R]
  ? P extends F
    ? S['length']
    : IndexOf<R, P, [...S, 1]>
  : S['length']

export {}
