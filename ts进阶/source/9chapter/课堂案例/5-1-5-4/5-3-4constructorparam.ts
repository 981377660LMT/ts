//5-3constructorparam.ts
class TestClass {// 准备类
  public name: string
  public classno: number
  constructor(username: string, classno: number) {
    this.name = username;
    this.classno = classno
  }
  eat() {
    console.log("姓名为: " + this.name + "班级：" + this.classno);
  }
}

// 慕课网TS高级课程，带参数检测的泛型工厂函数实例方法
//  1.ConstructorParametersType==>获取构造函数类型中的参数类型
type ConstructorParametersType<T extends new (...args: any[]) => any>
  = T extends new (...args: infer P) => any ? P : never

type Constructor<T> = new (...args: any[]) => T

function createInstance<T, CP extends new (...args: any[]) => any>
(constructor: Constructor<T>,
  ...args: ConstructorParametersType<CP>) {
  //...args: ConstructorParametersType<typeof TestClass>) {
  //...args: [username: string, classno: number]) {
  return new constructor(args[0], args[1])
}
// 带参数检测的泛型工厂函数实例方法的测试
//createInstance<TestClass>(TestClass, "wangwu", 105, 23).eat();
// 应有 3 个参数，但获得 4 个
//createInstance<TestClass,typeof TestClass>(TestClass, "wangwu", 105,23).eat();
createInstance<TestClass, typeof TestClass>(TestClass, "wangwu", 105).eat();
export { }











//5-3-3constructorparam.ts