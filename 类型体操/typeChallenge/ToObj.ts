type ToObj<T> = {
  [K in keyof T]: T[K]
}

type Test = ToObj<{ a: 12 } & { b: string }>

export { ToObj }
