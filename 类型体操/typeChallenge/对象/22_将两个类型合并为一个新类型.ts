type KV<T> = { [K in keyof T]: T[K] }
type Merge<F, S> = KV<{ [K in Exclude<keyof F, keyof S>]: F[K] } & S>
