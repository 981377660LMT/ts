interface Man {
  name: string
  height: number
  weight: number
}

type PartialOptional<T, K extends keyof T> = {
  [P in K]?: T[P]
}

type Noname = PartialOptional<Man, 'name'>
