import 'reflect-metadata'
type MyMethodDecoratorType =
  (targetClassPrototype: any, methodname: string, dataprops: PropertyDescriptor) => void

function requestDecorator(methodType: string) {
  return function (reqPath: string): MyMethodDecoratorType {
    return function (targetClassPrototype, methodname, dataprops) {
      console.log("进入到方法饰器", "path:", reqPath);

      let TargetClass = targetClassPrototype.constructor;
      let TargetClassObj = new TargetClass();

      Reflect.defineMetadata("path", reqPath, targetClassPrototype, methodname)
      Reflect.defineMetadata("methodType", methodType, targetClassPrototype, methodname)

    }
  }
}
export const get = requestDecorator("get")
export const post = requestDecorator("post")
//export const put = requestDecorator("put")

