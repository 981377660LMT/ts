function LoggerInfoDecorator<T extends { new (...args: any): any }>(
  targetClass: new (...args: any) => Test
) {
  // 匿名类
  return class extends targetClass {
    constructor(...args: any) {
      super(...args)
      console.log('日志信息...targetClass:', (targetClass as any).name)
    }

    methodone() {
      console.log('methodone:', this.name)
    }
  }

  //return LoggerSonClass
}

// 2. 目标类
// 类型 "typeof LoggerSonClass" 没有调用签名。
@LoggerInfoDecorator
class Test {
  name!: string
  age!: number
  // 1.先执行原来构造函数
  constructor(name: string) {
    this.name = name
  }
  eat() {
    console.log(this.name, '吃饭')
  }
}
export {}

let test = new Test('wer') //LoggerSonClass
;(test as any).methodone()
