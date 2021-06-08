```ts
inject 源码简化如下：
// 这是一个属性装饰器
function inject(serviceIdentifier) {
  // targetKey是方法名
  return function (target, targetKey) {
    const metadataValue = { [targetKey]: [Metadata { key: 'inject', value: serviceIdentifier })] }
    // target.constructor是类构造函数
    Reflect.defineMetadata('inversify:tagged_props', metadataValue, target.constructor);
  }
}

injectable 源码简化如下：
// 这是一个类装饰器
function injectable() {
  return function (target) {
    const metadataValue = []
    Reflect.defineMetadata('inversify:paramtypes', metadataValue, target)
    return target
  }
}

从简化版源码中可以看到 inject/injectable 最终是对 Reflect.defineMetadata() 的一个使用。可以将 metadata 看成是一种相对高效的数据结构。


metadata 本质上是一个 WeakMap 对象。
Reflect.defineMetadata(metadataKey, metadataValue, target[, propertyKey]) 简化版实现如下：

const Metadata = new WeakMap()

function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
  metadataMap = new Map()
  metadataMap.set(metadataKey, metadataValue)
  targetMetadata = new Map()
  targetMetadata.set(propertyKey, metadataMap)
  Metadata.set(target, targetMetadata)
}

Reflect.getOwnMetadata(metadataKey, target[, propertyKey]) 简化版实现如下：
function getOwnMetadata(metadataKey, target, propertyKey) {
  var targetMetadata = Metadata.get(target)
  var metadataMap = targetMetadata.get(propertyKey)
  return metadataMap.get(metadataKey)
}

其数据结构可表示如下：

WeakMap {
  target: Map {
    propertyKey: Map {
      metadataKey: metadataValue
    }
  }
}
```
