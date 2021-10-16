import { router } from '../util/router'
import MethodType from '../util/methodtype'
import { RequestHandler } from 'express'

export function Controller(reqRootPath: string): ClassDecorator {
  return function (targetClass) {
    console.log('控制器装饰器执行...')

    for (const methodname of Object.getOwnPropertyNames(targetClass.prototype)) {
      const routerpath: string = Reflect.getMetadata('path', targetClass.prototype, methodname)
      // 拿到装饰器对应的方法export const post = requestDecorator("post")
      const methodType: MethodType = Reflect.getMetadata(
        'methodType',
        targetClass.prototype,
        methodname
      )
      const targetMethodfunc: RequestHandler = targetClass.prototype[methodname]
      const middleawres: RequestHandler[] = Reflect.getMetadata(
        'middleawares',
        targetClass.prototype,
        methodname
      )

      // S100理解：当执行对应routerpath时，会自动执行targetMethodfunc方法
      if (routerpath && methodType) {
        if (middleawres) {
          router[methodType](reqRootPath + routerpath, ...middleawres, targetMethodfunc)
        } else {
          router[methodType](reqRootPath + routerpath, targetMethodfunc)
        }
      }
    }
  }
}
