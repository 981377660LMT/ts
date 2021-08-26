type A = [string, number, undefined, object, null]

/**
 * @description 对数组进行number索引访问，
 * 得到的是所有子项类型组成的联合类型
 * type B = string | number
 */
type B = A[number]

export {}
