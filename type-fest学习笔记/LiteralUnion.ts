export type LiteralUnion<LiteralType, BaseType extends Primitive> =
  | LiteralType
  | (BaseType & Record<never, never>)

// 让string与字面常量共存,且IDE有提示
