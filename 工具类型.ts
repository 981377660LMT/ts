type Diff<T, U> = T extends U ? never : T // Remove types from T that are assignable to U
type Filter<T, U> = T extends U ? T : never // Remove types from T that are not assignable to U

type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>
type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>

type ReturnType_<T> = T extends (...args: any[]) => infer R ? R : any

// -?操作
type Required_<T> = {
  [P in keyof T]-?: T[P]
}

interface Part {
  id: number
  name: string
  subparts?: Part[]
  updatePart(newName: string): void
}

type T40 = FunctionPropertyNames<Part> // "updatePart"
type T41 = NonFunctionPropertyNames<Part> // "id" | "name" | "subparts"
type T42 = FunctionProperties<Part> // { updatePart(newName: string): void }
type T43 = NonFunctionProperties<Part> // { id: number, name: string, subparts: Part[] }

type TFoo_ = Required_<Part>
