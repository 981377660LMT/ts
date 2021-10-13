class CommercialBank {
  public address: string = "beijing"
  public name: string = "wangwu"
  static count: number

  constructor(name: string, address: string) {
    this.address = address;
    this.name = name

  }
  loan(): void {
    console.log(this.name + " 银行贷款");
  }

}
// 1.类构造函数对象变量
//CommercialBank.count


//CommercialBank 双重性质  1.类构造函数对象变量  2.创建类对象的一个类型【new 后面出现的就是】
//CommercialBank.count
let cb = new CommercialBank("df", "sdf");//2.创建类对象的一个类型

function CommercialBank_(name: string, address: string) {

}

type CommercialBankType = new (...arg: any) => CommercialBank
//let t=new test();//在TS不能直接new一个函数来创建实例【对象】
// 工厂函数类型定义：代表任意一个类的构造函数【等价JS的构造函数】的函数类型。
type ConstructorType = new (...arg: any) => any

export { }
