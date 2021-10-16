import 'reflect-metadata'
import collectionInstance from '../collection'

type MyPropDecorator = (targetClassPrototype: any, propertyKey: string | symbol) => void
/**
 * 
 * @param dependencyid[injectid] 依赖id
 * @param singleton -判断是否是单件模式的对象 
 * @returns 
 */
export  function Autowired(dependencyid?: string, singleton?: boolean): MyPropDecorator {
  return (targetClassPrototype, propertyKey) => {
    let ServiceImplInstance: any
    let ServiceImplInstanceOrClass = Reflect.getMetadata("ServiceImplInstanceOrClass", targetClassPrototype, propertyKey)
    let metaSingleton = Reflect.getMetadata("singleton",
      targetClassPrototype, propertyKey)
    if (metaSingleton) {//如果是单件模式
      console.log("我是Autowired装饰器,单件模式获取对象");
      ServiceImplInstance = ServiceImplInstanceOrClass
    } else {
      ServiceImplInstance = new ServiceImplInstanceOrClass();
    }
    Reflect.defineProperty(targetClassPrototype, propertyKey,
      { value: ServiceImplInstance })// 修改为 PropServiceImplClassObj

  }
}