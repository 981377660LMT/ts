import { router } from '../util/router'
import MethodType from '../util/methodtype'
// 枚举

type MyClassDecorator = <T extends { new(...args: any): any }>
  (targetClass: T) => any
export function Controller(reqRootPath: string): MyClassDecorator {
  return function (targetClass): any {
    console.log("控制器装饰器执行...");
    for (let methodname in targetClass.prototype) {
      let routerpath = Reflect.getMetadata("path", targetClass.prototype, methodname)

      // 拿到装饰器对应的方法export const post = requestDecorator("post")
      let methodType: MethodType = Reflect.getMetadata("methodType", targetClass.prototype, methodname)
      const targetMethodfunc = targetClass.prototype[methodname];
      // S100理解：当执行对应routerpath时，会自动执行targetMethodfunc方法
      if (routerpath && methodType) {
        // if(methodType==="get"){
        //   router.get(routerpath, targetMethodfunc);// S100
        // }else if(methodType==="post"){
        //   router.post(routerpath, targetMethodfunc);// S100
        // }
        router[methodType](routerpath, targetMethodfunc)
      }
    }
  }
}
// type MethodType = "get" | "post"//把值当类型 类型和值就相同
// let myMethodType: MethodType = "get"
// let router = { "get": function () { }, "post": function () { } }
// let methodType: string = "get"

// router[myMethodType]