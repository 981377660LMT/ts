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
// 3 定义子类
class ChinesePeople extends People {
  guoYear() {

  }
}

//  4 子类获取父类原型上的方法和方法上的元数据 ———— hasMetadata
if (Reflect.hasMetadata('importinfo', ChinesePeople.prototype, 'eat')) {
  console.log("hasMetadata=>ChinesePeople原型上通过继承也获取到了eat方法和eat方法的importinfo元数据");
}

//  5  获取自有元数据,但不能获取原型链上父类的元数据 ———— hasOwnMetadata
if (Reflect.hasOwnMetadata('importinfo', ChinesePeople.prototype, 'eat')) {
  console.log("hasOwnMetadata=>ChinesePeople原型上存在eat方法的importinfo元数据");
} else {
  console.log("hasOwnMetadata=>ChinesePeople原型上不存在eat方法的importinfo元数据");
}