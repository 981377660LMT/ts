type EqualType<T, R> = [T] extends [R] ? ([R] extends [T] ? true : false) : false

type OnlyBoolean = PickByType<
  {
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
  },
  boolean
> // { isReadonly: boolean; isEnable: boolean; }

type PickByType<T, U> = {
  [K in keyof T as EqualType<T[K], U> extends true ? K : never]: T[K]
}

export {}
