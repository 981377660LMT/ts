type Merge<T> = { [K in keyof T]: T[K] }

type Diff<O1, O2> = Merge<
  {
    [K in Exclude<keyof O1, keyof O2>]: O1[K]
  } &
    {
      [K in Exclude<keyof O2, keyof O1>]: O2[K]
    }
>

export {}
