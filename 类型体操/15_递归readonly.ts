type DeepReadonly<T> = T extends Array<any>
  ? DeepReadonlyArray<T[number]>
  : T extends Record<PropertyKey, any>
  ? DeepReadonlyObject<T>
  : T

type DeepReadonlyArray<T> = ReadonlyArray<DeepReadonly<T>>
type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}
