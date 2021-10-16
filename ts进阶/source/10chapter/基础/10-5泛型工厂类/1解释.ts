// typeof LoggerSonClass 等价 new (...args:any)=>LoggerSonClass
class Test {
  age!: number
}
let targetClass: any = Test
class LoggerSonClass extends Test {
  public name: string = "test"
  methodone() {
    console.log("methodone:", this.name)
  }
}

let TestCopy = Test
TestCopy = LoggerSonClass;
let test = new TestCopy();
(test as any).methodone();
export { }