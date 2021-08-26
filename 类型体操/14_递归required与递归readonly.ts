// 如果T为对象，则将递归对象将所有key转换成required，类型转换为NonUndefined；如果T为数组则递归遍历数组将每一项设置为NonUndefined。

// 如果是函数或Primitive的类型，就直接返回该类型。
type DeepRequired<T> = T extends (...args: any[]) => any
  ? T
  : T extends Array<any>
  ? // 如果是数组 那么对数组每一项dfs
    DeepRequiredArray<T[number]>
  : T extends object
  ? // 如果是对象 那么对每个属性dfs
    DeepRequiredObject<T>
  : T

// 如果是数组类型，则借助DeepRequiredArray进行递归，并且传递的参数为数组所有子项类型组成的联合类型
type DeepRequiredArray<T> = Array<DeepRequired<NonNullable<T>>>

// 辅助工具，递归遍历对象将每一项转换成必选
type DeepRequiredObject<T extends object> = {
  [K in keyof T]-?: DeepRequired<NonNullable<T[K]>>
}
type Fpp = DeepRequired<{ a: { b: { c?: 1 } } }>
