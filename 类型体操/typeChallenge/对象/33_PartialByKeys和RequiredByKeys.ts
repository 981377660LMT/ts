interface User {
  name: string
  age: number
  address: string
}

type UserPartialName = PartialByKeys<User, 'name' | 'age'> // { name?:string; age:number; address:string }
type ToObj<T> = {
  [K in keyof T]: T[K]
}

type PartialByKeys<O extends object, P extends PropertyKey = any> = ToObj<
  {
    [K in keyof O as K extends P ? K : never]?: O[K]
  } & {
    [K in Exclude<keyof O, P>]: O[K]
  }
>

type RequiredByKeys<O extends object, P extends PropertyKey = any> = ToObj<
  {
    [K in keyof O as K extends P ? K : never]-?: O[K]
  } & {
    [K in Exclude<keyof O, P>]: O[K]
  }
>
export {}
