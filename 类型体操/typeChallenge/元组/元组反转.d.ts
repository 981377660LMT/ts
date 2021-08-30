type ReverseTuple<T extends any[]> = T extends [...infer L, infer R] ? [R, ...ReverseTuple<L>] : []
