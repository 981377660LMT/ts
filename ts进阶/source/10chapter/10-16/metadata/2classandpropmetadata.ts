//2classandpropmetadata.ts
import 'reflect-metadata'
// 1. 在类上定义元数据
@Reflect.metadata('decribe', '都是地球人')
class People {
  @Reflect.metadata("descible", "姓名不能包含非法汉字")
  username = "wangwu"
  @Reflect.metadata("importinfo", "去吃陶然居好吗")
  eat() {

  }
}
// 2
// 2.1 获取类上的元数据
console.log(Reflect.getMetadata('decribe', People));// 都是地球人

// 2.2 获取方法上的元数据 第二个参数是原型
console.log(Reflect.getMetadata('importinfo', People.prototype, 'eat'));//去吃陶然居好吗

// 2.3 判断People.prototype 原型上 eat 方法上是否存在importinfo元数据
if (Reflect.hasMetadata('importinfo', People.prototype, 'eat')) {
  console.log("hasMetadata=>People原型上存在eat方法的importinfo元数据");
}
