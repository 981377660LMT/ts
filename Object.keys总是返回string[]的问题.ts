// 第一种解决方法：需要对Object.keys()类型断言
Object.keys({ a: 1 }) as Array<'a'>

// 更好的解决方法：使用ID函数提取函数参数类型
const getKeys = <T>(obj: T) => Object.keys(obj) as Array<keyof T>
const obj = { a: 1, b: 2 }
const objKeys = getKeys(obj)

export default 1

// 恐怖的解决方法：在一个全局模块中(无import/export)使用接口合并
// type ObjectKeys<T> = T extends object
//   ? (keyof T)[]
//   : T extends number
//   ? []
//   : T extends Array<any> | string
//   ? string[]
//   : never

// interface ObjectConstructor {
//   keys<T>(o: T): ObjectKeys<T>
// }

// Object.keys({}).forEach(v => v)
