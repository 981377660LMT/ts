interface Taskobj {
  id: number
  levelContent: string
  selectTask: {
    id: number
    levelContent: string
    dtos: {
      id: number
      levelContent: string
      selectTask: boolean
    }
  }
}

type OmitDistributive<T, K extends PropertyKey> = T extends any
  ? T extends object
    ? Id<OmitRecursively<T, K>>
    : T
  : never
type Id<T> = {} & { [P in keyof T]: T[P] } // Cosmetic use only makes the tooltips expad the type can be removed
type OmitRecursively<T extends any, K extends PropertyKey> = Omit<
  { [P in keyof T]: OmitDistributive<T[P], K> },
  K
>

type foo = OmitRecursively<Taskobj, 'id' | 'levelContent'>

export { OmitRecursively }
