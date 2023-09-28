type Chunk<T extends any[], N extends number = 1, Chunked extends any[] = []> = T extends [infer Head, ...infer Tail]
  ? Chunked['length'] extends N
    ? [Chunked, ...Chunk<T, N>]
    : Chunk<Tail, N, [...Chunked, Head]>
  : Chunked extends []
  ? Chunked
  : [Chunked]

type TestChunk = Chunk<['a', 'b', 'c', 'd'], 2> // [['a', 'b'], ['c', 'd']]
