type MakeTuple<Target extends number, Res extends any[] = []> = Res['length'] extends Target
  ? Res
  : MakeTuple<Target, [...Res, 1]>

// type Helper<A extends any[], B extends any[], Res extends any[] = []> = A extends [
//   infer L1,
//   ...infer R1
// ]
//   ? Helper<R1, B, [...Res, 1]>
//   : B extends [infer L2, ...infer R2]
//   ? Helper<A, R2, [...Res, 1]>
//   : Res['length']

// type Add<A extends number, B extends number> = Helper<MakeArray<A>, MakeArray<B>>
type Add<A extends number, B extends number> = [...MakeTuple<A>, ...MakeTuple<B>]['length']

type A = Add<1, 2> // 3
type B = Add<0, 0> // 0

export { Add }
