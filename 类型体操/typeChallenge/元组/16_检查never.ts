// never是最小的集合,只有never能赋值给never
type IsNever<T> = [T] extends [never] ? true : false
type IsNever2<T> = T extends never ? true : false

type Foo = IsNever<never>
type Foo2 = IsNever2<never>

export {}
