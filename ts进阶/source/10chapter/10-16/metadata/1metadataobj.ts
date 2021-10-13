import 'reflect-metadata'
// 1. 对象
let obj = {
  username: "罗斯福",
  age: 23,
  info() {
    console.log("信息");
  }
}

Reflect.defineMetadata("metaobjkey", "我是一个对象的元数据", obj)
console.log(Reflect.getMetadata("metaobjkey", obj));//是一个对象的元数据

//  在对象属性上定义和获取元数据
Reflect.defineMetadata('usernamemetakey', '用户名合法', obj, "username");
console.log(Reflect.getMetadata('usernamemetakey', obj, "username"));// 输出用户名合法

//  3.2 使用 Reflect.hasMetadata 查看对象或对象属性上是否存在某个元数据
if (Reflect.hasMetadata('describe', obj)) {
  console.log("obj存在describe元数据");
} else {
  console.log("obj不存在describe元数据");
}

if (Reflect.hasMetadata('metaobjkey', obj)) {
  console.log("obj存在metaobjkey元数据");
} else {
  console.log("obj不存在metaobjkey元数据");
}