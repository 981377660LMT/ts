import 'reflect-metadata'
import collectionInstance from '../collection'

type MyPropDecorator = (targetClassPrototype: any, propertyKey: string | symbol) => void
/**
 * 
 * @param dependencyid[injectid] 依赖id
 * @param singleton -判断是否是单件模式的对象 
 * @returns 
 */
export default function Autowired(dependencyid?: string, singleton?: boolean): MyPropDecorator {
  return (targetClassPrototype, propertyKey) => {
    // PropClass=UserServiceInter伪接口类
    let PropServiceClass: any = Reflect.getMetadata("design:type",
      targetClassPrototype, propertyKey)
    //  增加开始....
    let ServiceImplClass: any = PropServiceClass.getServiceImplClass();
    let ServiceImplInstance// 对象
    if (singleton) {// 如果是单件模式的对象的注入方式 
      ServiceImplInstance = ServiceImplClass.getInstance();
    } else {
      ServiceImplInstance = new ServiceImplClass();
    }
    // 增加结束....
    //collectionInstance.set(propertyKey, PropClassObj);
    // 对比:Object.defineProperty
    // 好处:由于targetClassPrototype原型+propertyKey一起是绝对不会被覆盖的
    // 充分保证了数据属性中的value的对象的唯一性
    Reflect.defineProperty(targetClassPrototype, propertyKey,
      { value: ServiceImplInstance })// 修改为 PropServiceImplClassObj

  }
}