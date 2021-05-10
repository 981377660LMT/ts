import 'reflect-metadata'

const METHOD_METADATA = 'method'
const PATH_METADATA = 'path'

const Controller = (path: string): ClassDecorator => {
  return target => {
    Reflect.defineMetadata(PATH_METADATA, path, target)
  }
}

const createMappingDecorator = (method: string) => (path: string): MethodDecorator => {
  return (target, key, descriptor) => {
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value as Object)
    Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value as Object)
  }
}

const Get = createMappingDecorator('GET')
const Post = createMappingDecorator('POST')

@Controller('/test')
class SomeClass {
  @Get('/a')
  someGetMethod() {
    return 'hello world'
  }

  @Post('/b')
  somePostMethod() {}
}

//////////////////////////////////////////////////////////////////
const isConstructor = (item: any) => item === 'constructor'
const isFunction = (item: any) => typeof item === 'function'

// 获取类原型上的路由元信息
function mapRoute(instance: Object) {
  const prototype = Object.getPrototypeOf(instance)

  // 筛选出类的 methodName
  const methodsNames = Object.getOwnPropertyNames(prototype).filter(
    item => !isConstructor(item) && isFunction(prototype[item])
  )
  return methodsNames.map(methodName => {
    const fn = prototype[methodName]

    // 取出定义的 metadata
    const route = Reflect.getMetadata(PATH_METADATA, fn)
    const method = Reflect.getMetadata(METHOD_METADATA, fn)
    return {
      route,
      method,
      fn,
      methodName,
    }
  })
}

Reflect.getMetadata(PATH_METADATA, SomeClass) // '/test'

console.log(mapRoute(new SomeClass()))

// 最后，只需把 route 相关信息绑在 express 或者 koa 上就 ok 了。
