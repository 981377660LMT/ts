import 'reflect-metadata'
import collectionInstance from '../collection'

type MyPropDecorator = (targetClassPrototype: any, propertyKey: string | symbol) => void
export default function Autowired(injectid: string): MyPropDecorator {
  return (targetClassPrototype, propertyKey) => {
    // PropClass=UserServiceInter伪接口类
    let PropServiceClass: any = Reflect.getMetadata("design:type",
      targetClassPrototype, propertyKey)
    //  增加开始....
    let PropServiceImplClass = PropServiceClass.getServiceImplClass();

    let PropServiceImplClassObj = new PropServiceImplClass();
    console.log(PropServiceImplClassObj);
    // 增加结束....
    //collectionInstance.set(propertyKey, PropClassObj);
    // 对比:Object.defineProperty
    // 好处:由于targetClassPrototype原型+propertyKey一起是绝对不会被覆盖的
    // 充分保证了数据属性中的value的对象的唯一性
    Reflect.defineProperty(targetClassPrototype, propertyKey,
      { value: PropServiceImplClassObj })// 修改为 PropServiceImplClassObj


  }
}