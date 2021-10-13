import { RequestHandler } from 'express'
import 'reflect-metadata'
export function middleware(middleware: RequestHandler) {
  return function (targetPrototype: any, methodname: string) {
    // 方法1
    // 第一次进来的中间件函数middleware
    // let middlewares = Reflect.getMetadata("middleawares", targetPrototype, methodname)
    // if (!middlewares) {// 第一次进来的中间件函数数组赋值为初始值
    //   middlewares = []
    // }
    // 方法2
    let middlewares = Reflect.getMetadata("middleawares", targetPrototype, methodname) || []
    middlewares.push(middleware)
    Reflect.defineMetadata("middleawares", middlewares,
      targetPrototype, methodname)
  }
}