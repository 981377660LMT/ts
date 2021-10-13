import 'reflect-metadata'
type MyPropDecorator = (targetClassPrototype: any, propertyKey: string | symbol) => void

export  function Singleton(isSingleton: boolean): MyPropDecorator {
  return (targetClassPrototype, propertyKey) => {
    let PropServiceClass: any = Reflect.getMetadata("design:type",
      targetClassPrototype, propertyKey)
    //  增加开始....
    let ServiceImplClass: any = PropServiceClass.getServiceImplClass();
    let ServiceImplInstanceOrClass// 对象
    let metaSingleton = Reflect.getMetadata("singleton",
      targetClassPrototype, propertyKey)

    if (isSingleton) {//如果是单件模式
      if (!metaSingleton) {// 第一次进来执行
        Reflect.defineMetadata("singleton", isSingleton, targetClassPrototype, propertyKey)
        ServiceImplInstanceOrClass = ServiceImplClass.getInstance();//单件模式获取唯一的对象
      } else {// 第二次或以上次重复进来执行
        console.log("单件模式创建,使用了上一次的对象");
      }
    } else {//如果不是单件模式,每次都创建一个对象
      ServiceImplInstanceOrClass = ServiceImplClass;
    }
    // 保存对象或者类
    Reflect.defineMetadata("ServiceImplInstanceOrClass",
      ServiceImplInstanceOrClass, targetClassPrototype, propertyKey)

  }
}