// !1. 接口中无法使用 keyof，必须要用 type
// wrong
// interface Foo<S extends Record<string,boolean>>{
//   [K in keyof S]:S[K]
// }
//
// right
type Foo2<S extends Record<string, boolean>> = {
  [K in keyof S]: S[K]
}

// !2. 映射类型不能声明属性或方法，只能用交叉类型添加属性
// wrong
// type Foo3<S extends Record<string, boolean>> = {
// [K in keyof S]: S[K]
// [K: string]: any  // 映射的类型可能不声明属性或方法。ts(7061)
// }
// right
type Foo4<S extends Record<string, boolean>> = {
  [K in keyof S]: S[K]
} & {
  [K in keyof S as `set${Capitalize<string & K>}`]: (value: S[K]) => void
} & {
  [K in keyof S as `get${Capitalize<string & K>}`]: () => S[K]
}

type TestFoo4 = Foo4<{ a: boolean; b: boolean }>
declare const testFoo4: TestFoo4
testFoo4.setA(true)

// !3. 使用索引重映射+联合类型一次添加多个属性
type Foo5<S extends Record<string, boolean>> = {
  [K in keyof S as K | `is${Capitalize<string & K>}`]: S[K]
}

type TestFoo5 = Foo5<{ a: boolean; b: boolean }>
