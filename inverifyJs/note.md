“解耦”是 IOC / DI 思想的起点与核心

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

axios 提供的 interceptors 拦截器机制就非常适合用来处理类似的场景，它就是非常典型的“面向切面”实践

```ts
源码浅析

首先是injectable装饰器的定义：

function injectable() {
    return function (target) {
        if (Reflect.hasOwnMetadata(‘inversify:paramtypes’, target)) {
            throw new Error(/*...*/);
        }
        var types = Reflect.getMetadata(‘design:paramtypes’, target) || [];
        Reflect.defineMetadata(‘inversify:paramtypes’, types, target);
        return target;
    };
}
可以看到injectable装饰器所做的事情就是把与target对应的key为“design:paramtypes”的元信息赋值给了key为“inversify:paramtypes”的元信息。

再来看看inject装饰器工厂的源码：

function inject(serviceIdentifier) {
    return function (target, targetKey, index) {
        if (serviceIdentifier === undefined) {
            throw new Error(UNDEFINED_INJECT_ANNOTATION(target.name));
        }
        var metadata = new Metadata(METADATA_KEY.INJECT_TAG, serviceIdentifier);
        if (typeof index === "number") {
            tagParameter(target, targetKey, index, metadata);
        }
        else {
            tagProperty(target, targetKey, metadata);
        }
    };
}
export { inject };

第三个参数index是该参数在函数形参中的顺序索引，是数字类型的，否则将认为该装饰器是作为属性装饰器使用的，tagParameter和tagProperty底层调用的是同一个函数，其核心逻辑是在进行了大量的容错检查后，将新的元信息添加到正确的数组中保存起来。
事实上无论是injectable还是inject，它们作为装饰器所承担的任务都是对于元信息的保存，IOC的实例管理能力都是依赖于容器类Container来实现的。
```
