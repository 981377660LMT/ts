type Zip<One extends unknown[], Other extends unknown[]> = One extends [infer OneFirst, ...infer Rest1]
  ? Other extends [infer OtherFirst, ...infer Rest2]
    ? [[OneFirst, OtherFirst], ...Zip<Rest1, Rest2>]
    : []
  : []

type Mutable<Obj> = {
  -readonly [Key in keyof Obj]: Obj[Key]
}

function zip(target: unknown[], source: unknown[]): unknown[]

function zip<Target extends readonly unknown[], Source extends readonly unknown[]>(
  target: Target,
  source: Source
): Zip<Mutable<Target>, Mutable<Source>>

function zip(target: unknown[], source: unknown[]) {
  if (!target.length || !source.length) return []

  const [one, ...rest1] = target
  const [other, ...rest2] = source

  return [[one, other], ...zip(rest1, rest2)]
}

const result = zip([1, 2, 3] as const, [4, 5, 6] as const)

const arr1 = [1, 2, 3]
const arr2 = [4, '5', 6]

const result2 = zip(arr1, arr2)
