type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

function extend<U extends object, V extends object>(a: U, b: V): U & V {
  return Object.assign(a, b)
}

function extendTo<Target extends object, Sources extends object[]>(
  target: Target,
  ...sources: Sources
): UnionToIntersection<Target | Sources[number]> {
  return Object.assign(target, ...sources)
}

if (require.main === module) {
  const res = extend({ a: 1 }, { b: 2 })
  const res2 = extendTo({ a: 1 }, { b: 2 }, { c: 3 })
  console.log(res, res2)
}
