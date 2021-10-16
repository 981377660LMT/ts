import 'reflect-metadata'

type MyPropDecorator = (targetClassPrototype: any, propertyKey: string | symbol) => void
export function Inject(injectid: string): MyPropDecorator {
  return (targetClassPrototype, propertyKey) => {
    // PropClass=UserService类   'design:type' 获取属性类型
    let PropClass = Reflect.getMetadata('design:type', targetClassPrototype, propertyKey)
    console.log(PropClass, 90)
    let PropClassObj = new PropClass()
    Reflect.defineMetadata('prop', '属性上的元数据', targetClassPrototype, propertyKey)
  }
}
