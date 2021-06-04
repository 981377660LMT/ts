// import 'reflect-metadata'

// // 元数据的命令式定义，定义对象或属性的元数据
// Reflect.defineMetadata(metadataKey, metadataValue, target)
// Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey)

// // 检查对象或属性的原型链上是否存在元数据键
// let result = Reflect.hasMetadata(metadataKey, target)
// let result = Reflect.hasMetadata(metadataKey, target, propertyKey)

// // 检查对象或属性是否存在自己的元数据键
// let result = Reflect.hasOwnMetadata(metadataKey, target)
// let result = Reflect.hasOwnMetadata(metadataKey, target, propertyKey)

// // 获取对象或属性原型链上元数据键的元数据值
// let result = Reflect.getMetadata(metadataKey, target)
// let result = Reflect.getMetadata(metadataKey, target, propertyKey)

// // 获取对象或属性的自己的元数据键的元数据值
// let result = Reflect.getOwnMetadata(metadataKey, target)
// let result = Reflect.getOwnMetadata(metadataKey, target, propertyKey)

// // 获取对象或属性原型链上的所有元数据键
// let result = Reflect.getMetadataKeys(target)
// let result = Reflect.getMetadataKeys(target, propertyKey)

// // 获取对象或属性的所有自己的元数据键
// let result = Reflect.getOwnMetadataKeys(target)
// let result = Reflect.getOwnMetadataKeys(target, propertyKey)

// // 从对象或属性中删除元数据
// let result = Reflect.deleteMetadata(metadataKey, target)
// let result = Reflect.deleteMetadata(metadataKey, target, propertyKey)

// // 通过装饰器将元数据应用于构造函数
// @Reflect.metadata(metadataKey, metadataValue)
// class C {
//   // 通过装饰器将元数据应用于方法(属性)
//   @Reflect.metadata(metadataKey, metadataValue)
//   method() {}
// }
