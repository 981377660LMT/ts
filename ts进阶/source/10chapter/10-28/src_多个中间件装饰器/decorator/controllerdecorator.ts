import { router } from '../util/router'
import MethodType from '../util/methodtype'
import { RequestHandler } from 'express'


type MyClassDecorator = <T extends { new(...args: any): any }>
  (targetClass: T) => any
export function Controller(reqRootPath: string): MyClassDecorator {
  return function (targetClass): any {
    console.log("控制器装饰器执行...");
    for (let methodname in targetClass.prototype) {
      let routerpath = Reflect.getMetadata("path", targetClass.prototype, methodname)
      // 拿到装饰器对应的方法export const post = requestDecorator("post")
      let methodType: MethodType = Reflect.getMetadata("methodType", targetClass.prototype, methodname)
      const targetMethodfunc: RequestHandler = targetClass.prototype[methodname];
      // 获取中间件装饰器保存的中间件函数元数据

      let middleawres: RequestHandler[] = Reflect.getMetadata("middleawares",
        targetClass.prototype, methodname)

      // S100理解：当执行对应routerpath时，会自动执行targetMethodfunc方法
      if (routerpath && methodType) {
        if (middleawres) {

          router[methodType](routerpath, ...middleawres, targetMethodfunc)
        } else {
          
          router.get(routerpath, targetMethodfunc);
          router[methodType](routerpath, targetMethodfunc)
        }
      }
    }
  }
}
