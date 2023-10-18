const enum F {
  A = 1,
  B = 'a'
}

export type Primitive = string | number | boolean | bigint | symbol | undefined | null

/**
 * 枚举的键。
 */
export type EnumKeys<TypeofEnum> = keyof TypeofEnum

/**
 * 枚举的值。
 */
export type EnumValues<E extends Exclude<Primitive, symbol>> = `${E}`

type Test1 = EnumKeys<typeof F>
type Test2 = EnumValues<F> // "A" | "B"

export {}
