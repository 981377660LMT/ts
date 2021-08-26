type Diff<T extends object, U extends object> = Pick<T, Exclude<keyof T, keyof U>>

type Bar = Diff<{ a: 1; b: 2 }, { a: 9 }>

export { Diff }
