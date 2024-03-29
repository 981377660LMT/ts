export type TupleToUnion<T extends readonly unknown[]> = T[number]
export type UnionToTuple<T, A extends unknown[] = []> = IsUnion<T> extends true
  ? UnionToTuple<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
  : [T, ...A]

// credits goes to https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type/50375286#50375286
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

// credits goes to https://github.com/microsoft/TypeScript/issues/13298#issuecomment-468114901
type UnionToOvlds<U> = UnionToIntersection<U extends any ? (f: U) => void : never>

type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never

// credits goes to https://stackoverflow.com/questions/53953814/typescript-check-if-a-type-is-a-union#comment-94748994
type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true

// 4.7 的 infer extends 语法
// !infer 的时候加上 extends 来约束推导的类型，这样推导出的就不再是 unknown 了，而是约束的类型。
type StringToNumber<S extends string> = S extends `${infer Num extends number}` ? Num : S
type StringToBoolean<S extends string> = S extends `${infer Bool extends boolean}` ? Bool : S
type StringToNull<S extends string> = S extends `${infer Null extends null}` ? Null : S
