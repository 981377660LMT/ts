// 比谁先挂
type LargerThan<A extends number, B extends number, C extends number[] = []> = C['length'] extends A
  ? false
  : C['length'] extends B
  ? true
  : LargerThan<A, B, [...C, 1]>

type SmallerThan<A extends number, B extends number, C extends any[] = []> = C['length'] extends B
  ? false
  : C['length'] extends A
  ? true
  : SmallerThan<A, B, [...C, 1]>

type IsEqual<T, R> = (<S>() => S extends T ? 1 : 0) extends <S>() => S extends R ? 1 : 0
  ? true
  : false

type A = LargerThan<0, 1> // false
type B = LargerThan<1, 0> // true
type C = LargerThan<10, 9> // true
type D = LargerThan<1, 1> // false
type E = LargerThan<1, 2> // false
type A = SmallerThan<0, 1> // true
type B = SmallerThan<1, 0> // false
type C = SmallerThan<10, 9> // false
type F = IsEqual<10, 10> // false

export { LargerThan, SmallerThan, IsEqual }

// 注意者两种写法
// type Tpp<A> = (<S>() => S) extends A ? 1 : 0
// type Tpp<A> = <S>() => S extends A ? 1 : 0
// type Test = Tpp<1>
