type Filter<T extends any[], A, Res extends any[] = []> = T extends [infer L, ...infer R]
  ? [L] extends [A]
    ? Filter<R, A, [...Res, L]>
    : Filter<R, A, Res>
  : Res

type A = Filter<[1, 'BFE', 2, true, 'dev'], number> // [1, 2]
type B = Filter<[1, 'BFE', 2, true, 'dev'], string> // ['BFE', 'dev']
type C = Filter<[1, 'BFE', 2, any, 'dev'], string>
