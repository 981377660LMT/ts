// 恐怖的解决方法：在一个非模块文件中(无import/export)接口合并
// 注意：这样很危险！ 会影响到全局！不推荐使用！

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

// Object.keys({ a: 1 }).forEach(v => v)
