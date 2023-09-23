type Test1<T> = T extends number ? 1 : 2
type Res1 = Test1<1 | 'a'>

type Test2<T> = T extends true ? 1 : 2
type Res2 = Test2<boolean> // 因为 boolean 是 true | false
type Res3 = Test2<any> // 条件类型对 any 做了特殊处理，如果左边是 any，那么直接把 trueType 和 falseType 合并成联合类型返回。
type Res4 = Test2<never> // 当条件类型左边是 never 时，直接返回 never。

export {}

// 条件类型当 checkType（左边的类型）是类型参数的时候，
// 会有 distributive 的性质，也就是传入联合类型时会把每个类型单独传入做计算，
// 最后把结果合并返回。这叫做分布式条件类型。
// 此外，条件类型遇到 never 会直接返回 never，
// 遇到 any 会返回 trueType 和 falseType 的联合类型。
type A = 'foo' // global scope
