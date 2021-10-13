import 'reflect-metadata'
// 3. 属性装饰器
type MyPropertyDecorator = (target: any, propertyKey: string | symbol) => void;
import collection from './Collection'
export function InjectProperty(injectid?: any): MyPropertyDecorator {

  return function (targetproperty, propertyKey) {
    console.log(" 进入属性参数装饰器....", targetproperty);
    console.log("获取类属性的数据类型");
    const PropClass = Reflect.getMetadata("design:type", targetproperty, propertyKey);
    let PropClassObj = new PropClass();
    collection.set(injectid!, PropClassObj)
    console.log("属性装饰器结束========================");
  }
}