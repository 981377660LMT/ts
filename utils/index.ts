/** 如果 X 和 Y 类型相等，则返回 Resolved 类型，否则返回 Rejected 类型. */
export type IfEquals<X, Y, Resolved = X, Rejected = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? Resolved : Rejected

/** 只包含可选属性的对象. */
export type OnlyContainsOptionalProps<T extends object = {}, Rejected = never> = IfEquals<T, Partial<T>, T, Rejected>

export type AtLeastOne<T> = { [K in keyof T]: Pick<T, K> }[keyof T]

export type Simplify<T> = { [K in keyof T]: T[K] }

export type SetOptional<T extends object, K extends keyof T> = Simplify<Partial<Pick<T, K>> & Omit<T, K>>

export type EnumValues<E extends Exclude<Primitive, symbol>> = `${E}`

export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never
export type LooseRequired<T> = {
  [P in keyof (T & Required<T>)]: T[P]
}

type Primitive = string | number | boolean | bigint | symbol | undefined | null
type Builtin = Primitive | Function | Date | Error | RegExp
export type DeepReadonly<T> = T extends Builtin
  ? T
  : T extends Map<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends Set<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepReadonly<U>>
  : T extends Promise<infer U>
  ? Promise<DeepReadonly<U>>
  : T extends Ref<infer U>
  ? Readonly<Ref<DeepReadonly<U>>>
  : T extends {}
  ? {
      readonly [K in keyof T]: DeepReadonly<T[K]>
    }
  : Readonly<T>
