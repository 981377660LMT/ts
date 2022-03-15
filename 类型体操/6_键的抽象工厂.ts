type Primitive = string | number | bigint | boolean | symbol | null | undefined
// sun sb nb

/**
 * @desc 用于创建获取指定类型工具的类型工厂
 * @param T 待提取的类型
 * @param P 要创建的类型
 * @param IsCheckNon 是否要进行null和undefined检查
 */
type KeysFactory<T, P extends Primitive | Function | object, IsCheckNon extends boolean> = {
  [K in keyof T]: IsCheckNon extends true
    ? NonNullable<T[K]> extends P
      ? K
      : never
    : T[K] extends P
    ? K
    : never
}[keyof T]

/**
 * @example
 * 例如上述KeysFactory就可以通过工厂类型进行创建了
 */
type FunctionKeys<T> = KeysFactory<T, Function, true>
type StringKeys<T> = KeysFactory<T, string, true>
type NumberKeys<T> = KeysFactory<T, number, true>

export {}
