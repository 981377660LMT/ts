type AType = {
  key1: string
  key2: () => void
  key3: Function
  key4: undefined
}

type FunctionKeys<T extends object> = {
  [K in keyof T]: NonNullable<T[K]> extends Function ? K : never
}[keyof T]

/**
 * @example
 * type Eg = 'key2' | 'key3';
 * @description 取到的为值类型的联合类型never | key2 | key3,计算后就是key2 | key3;
 */
type FK = FunctionKeys<AType>

// null和undefined可以赋值给其他类型（开始该类型的严格赋值检测除外）,所以上述实现中需要使用NonUndefined先行判断。
type M = undefined extends Function ? 1 : 2
type N = null extends Function ? 1 : 2
