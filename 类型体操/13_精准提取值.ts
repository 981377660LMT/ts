type PickByValue<T extends object, V> = Pick<
  T,
  ValueType<{ [K in keyof T]: T[K] extends V ? K : never }>
>

// string是可以分配给string | number 的
// 因此上述并不是精准的提取方式
// 需要双向extends
type PickByValueExact<T extends object, V> = Pick<
  T,
  // 给泛型套一层元组规避extends的分发式联合类型的特性
  ValueType<{ [K in keyof T]: [T[K]] extends [V] ? ([V] extends [T[K]] ? K : never) : never }>
>

// type Eg1 = {
//     b: number;
//     c: number | undefined;
// };
type Eg1 = PickByValue<{ a: string; b: number; c: number | undefined }, number>
// type Eg2 = { b: number }
type Eg2 = PickByValueExact<{ a: string; b: number; c: number | undefined }, number>

export {}

// 辅助函数，用于获取T中非never的值类型
type ValueType<T> = T[keyof T]
type Test = ValueType<{ a: never; b: string; c: 2 }>
