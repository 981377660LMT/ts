/** 如果 X 和 Y 类型相等，则返回 Resolved 类型，否则返回 Rejected 类型. */
export type IfEquals<X, Y, Resolved = X, Rejected = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? Resolved : Rejected

/** 只包含可选属性的对象. */
export type OnlyContainsOptionalProps<T extends object = {}, Rejected = never> = IfEquals<T, Partial<T>, T, Rejected>

export type AtLeastOne<T> = { [K in keyof T]: Pick<T, K> }[keyof T]

export type Simplify<T> = { [K in keyof T]: T[K] }

export type SetOptional<T extends object, K extends keyof T> = Simplify<Partial<Pick<T, K>> & Omit<T, K>>

export type Primitive = string | number | boolean | bigint | symbol | undefined | null

export type EnumValues<E extends Exclude<Primitive, symbol>> = `${E}`
