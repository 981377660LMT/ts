//5-3constructorparam.ts
class TestClass {// 准备类
  public name: string
  public classno: number
  constructor(name: string, classno: number) {
    this.name = name;
    this.classno = classno
  }
  eat() {
    console.log("姓名为: " + this.name + "班级：" + this.classno);
  }
}

type ConstructorParametersType<T extends new (...args: any[]) => any>
  = T extends new (...args: infer P) => any ? P : never

type Constructor<T> = new (...args: any[]) => T

function createInstance<T>(constructor: Constructor<T>, ...args: any[]) {
  return new constructor(args[0], args[1])
}
//createInstance<TestClass>(TestClass, "wangwu", 105).eat();
createInstance(TestClass, "wangwu", 105).eat();



export { }











//5-3-3constructorparam.ts