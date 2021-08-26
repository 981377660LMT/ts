type I = GetRequired<{ foo: number; bar?: string }> // expected to be { foo: number }
type J = GetOptional<{ foo: number; bar?: string }> // expected to be { foo: number }

export {}

// 需要用这个强比较
// 加上 [] 是为了防止联合类型进行分配模式
type IfEquals<X, Y> = [X] extends [Y] ? ([Y] extends [X] ? true : false) : false

type GetRequired<T extends object> = {
  [K in keyof T as IfEquals<{ [O in K]: T[O] }, { [O in K]-?: T[O] }> extends true
    ? K
    : never]: T[K]
}

type GetOptional<T extends object> = {
  [K in keyof T as IfEquals<{ [O in K]: T[O] }, { [O in K]-?: T[O] }> extends true
    ? never
    : K]: T[K]
}
