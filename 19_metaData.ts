// https://zhuanlan.zhihu.com/p/87511653
// https://zhuanlan.zhihu.com/p/92700557
// https://juejin.cn/post/6873109144778309639
//github.com/funfish/blog/blob/master/43.%20nest%20%E5%88%9D%E5%A7%8B%E5%8C%96.mdown
// https://juejin.cn/post/6844903780312416264
// 反射机制指的是程序在运行时能够获取自身的信息
// 可以利用JS的for(…in…)语句，Object.getOwnPropertyDescriptor实现反射机制
// Reflect是一个内建的对象，用来提供方法去拦截JavaScript的操作。Reflect不是一个函数对象，所以它是不可构造的，也就是说它不是一个构造器，
// 你不能通过`new`操作符去新建或者将其作为一个函数去调用Reflect对象。Reflect的所有属性和方法都是静态的。

// 说了反射机制和反射对象这么多，我们会如何应用反射机制？
// 假设有这么一个场景：你需要在一个从一个类中获取额外的元信息，或者希望给类中的一些方法加入注解(Annotation)，
// 然后在实时的运行中获取到对应的元数据信息，那么这种场合就适合使用反射机制(配合修饰器的使用)
// 元数据是什么：例如被装饰器装饰函数的名称，带参数装饰的参数等；例如python里的func.__name__
// 定义元数据 => 获取元数据

// 两种定义元数据的方法
// Reflect.metadata声明式
// class C {
//   @Reflect.metadata(metadataKey, metadataValue)
//   method() {
//   }
// }
// Reflect.defineMetadata命令式
// Reflect.defineMetadata(metadataKey, metadataValue, C.prototype, "method");

// 获取元数据: Reflect.getMetadata(CONTROLLER_METADATA, Demo)
// 内置的三种metakey:获取属性的类型design:type,design:paramtypes,design:returntype

// 控制反转与依赖注入便是基于此实现
// 控制反转IoC-Inversion of Control：添加元数据并传入IoC容器即app.module.ts，元数据即代表依赖的对象；ioc 容器(app.module.ts)获取元数据，扫描所有类的依赖并通过元数据生成依赖对象，再注入当前类生成实例。
// 依赖注入DI—Dependency Injection：程序只用负责使用依赖就好了，至于依赖如何被创建不用用户关心，交给第三方 IOC 容器来负责
// 基于构造函数的注入例如inject service和injectReposity直接注入服务类或者类型实体

// 对象不需要你自己导入和实例化，只需要在类的构造函数中声明需要的的对象，
// IOC容器会帮你把所有的依赖的对象实例注入进去。在nest中，所有的类都会被登记，
// 然后nest的DI系统会在恰当的时机，把类实例化交给你使用，销毁对象等等，
// 所以说对某一个具体的类而言，都被nest控制，这就是控制反转。

// 控制反转是框架和库的关键区别所在。对于一个库而言，用户程序员使用的方式是主动调用它，这是通常情况的做法，
// 也就是“正向”控制；而对于一个框架，往往将用户程序员编写的代码注册到框架中，
// 最后由框架来调用用户程序员编写的代码，这就构成了控制反转。也就是说，控制反转的关键在于“控制者”是谁。
// 对于一个库而言，复用的可能只是算法和数据结构；
// 而对于一个框架而言，复用的往往还有控制流逻辑，这也是控制反转的结果。

// DI 容器在动态语言中的不必要
// 在 Python 这样的动态语言中，需要对一个已经编译好的模块使用 Stub、Mock，只需要直接替换其属性(Monkey Patch),例如重写某个类的方法。

import 'reflect-metadata'

export const CONTROLLER_METADATA = 'controller'
export const ROUTE_METADATA = 'method'
export const PARAM_METADATA = 'param'

// 获取属性的类型
const logType: PropertyDecorator = (target, key) => {
  const t = Reflect.getMetadata('design:type', target, key)
  console.log(`${String(key)} type: ${t.name}`)
}

// 获取方法的参数类型和返回值类型
const logParamTypes: MethodDecorator = (target, key) => {
  const types = Reflect.getMetadata('design:paramtypes', target, key)
  const returnType = Reflect.getMetadata('design:returntype', target, key).name
  const s = types.map((a: any) => a.name).join()
  console.log(`${String(key)} param types: ${s} , returnType:${returnType}`)
}

const Controller = (path = ''): ClassDecorator => target =>
  Reflect.defineMetadata(CONTROLLER_METADATA, path, target)

const createMethodDecorator = (method = 'GET') => (path = '/'): MethodDecorator => (
  target,
  key,
  descriptor
) => {
  const preMetadata = Reflect.getMetadata(ROUTE_METADATA, target) || []
  const newMetadata = [{ path, type: method, handler: descriptor.value }, ...preMetadata]
  Reflect.defineMetadata(ROUTE_METADATA, newMetadata, target)
}

const createParamDecorator = (type: string) => (name?: string): ParameterDecorator => (
  target,
  key,
  index
) => {
  // 这里要注意这里 defineMetadata 挂在 target.name 上
  // 但该函数的参数有顺序之分，下一个装饰器定义参数后覆盖之前的，所以要用 preMetadata 保存起来
  const preMetadata = Reflect.getMetadata(PARAM_METADATA, target, key) || []
  const newMetadata = [{ index, type, handler: key }, ...preMetadata]
  Reflect.defineMetadata(PARAM_METADATA, newMetadata, target, key)
}

const GET = createMethodDecorator('GET')
const Query = createParamDecorator('query')

@Controller('/user')
class Demo {
  @logType
  public attr1: string = 'c'

  @logParamTypes
  doSomething(
    param1: string,
    param2: number,
    param4: { test: string },
    param6: Function,
    param7: (a: number) => void
  ): number {
    return 1
  }

  @GET('/hi')
  getUser() {
    return { name: 'cmnx', age: 22 }
  }

  @GET('/test')
  getUserTest(@Query('id') id: string) {
    return { name: 'cmnx', age: 22 }
  }
}

console.log('控制器元信息:', Reflect.getMetadata(CONTROLLER_METADATA, Demo))

const routes = Reflect.getMetadata(ROUTE_METADATA, Demo.prototype) as []
console.log('路由元信息:', routes)

const routesHandler = routes
  .map((route: any) => route.handler)
  .reduce((pre, cur) => {
    return [...pre, Reflect.getMetadata(PARAM_METADATA, Demo.prototype, cur.name)]
  }, [])

console.log('参数元信息', routesHandler)

// length 是函数对象的一个属性值，指该函数有多少个必须要传入的参数，即形参的个数。
// 形参的数量不包括剩余参数个数，仅包括第一个具有默认值之前的参数个数。
// 与之对比的是，  arguments.length 是函数被调用时实际传参的个数。
console.log(Controller.length)
