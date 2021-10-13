//5-3constructorparam.ts
class TestClass {// 准备类
  public name: string
  public classno: number
  constructor(name: string, classno: number) {
    this.name = name;
    this.classno = classno
  }
  eat() {
    console.log("姓名为: " + this.name);
  }
}

type ConstructorParametersType<T extends new (...args: any[]) => any>
  = T extends new (...args: infer P) => any ? P : never
//  获取到了 TestClass 构造函数的参数类型 放到一个元组中[name: string, classno: number]

//let constructorParameters: ConstructorParametersType<typeof TestClass>
//let constructorParameters: 
//  ConstructorParametersType<new (name: string, classno: number) => TestClass>
let constructorParameters: ConstructorParametersType<typeof TestClass>

type Constructor<T> = new (...args: any[]) => T

export { }