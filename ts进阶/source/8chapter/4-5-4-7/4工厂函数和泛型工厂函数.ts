// 4工厂函数和泛型工厂函数.ts
class  CommercialBank {
  public address: string = "beijing"
  public name: string = "wangwu"
  static count: number

  constructor(name: string, address: string) {
    // 日志文件 哪一个类被创建

    this.address = address;
    this.name = name
    
  }
  loan(): void {
    console.log(this.name + " 银行贷款");
  }
}
let o:CommercialBank=new CommercialBank("Df","Df")

// 工厂函数 [一些不方便【比如说为每一个类对象创建时都打印一句，哪一个类被创建到文件或者直接打印在控制台上或者没有办法直接 new  类名（）格式来创建类对象]
//function createInstanceFactory(Constructor:new (...arg: any) => any) {
function createInstanceFactory(Constructor: { new(...arg: any): any }) {
  console.log(Constructor.name + "被创建对象");
  return new Constructor("广大银行", "万绿园");
}
// 使用工厂函数来创建我们的CommercialBank
let con = createInstanceFactory(CommercialBank)

//createInstanceFactory(Customer)

// 2.工厂函数类型的简单使用
type ConstructorType = new (...arg: any) => any
let Constructor: ConstructorType = CommercialBank// new (...arg: any) => CommercialBank
let con2 = new Constructor("广大银行", "万绿园");//CommercialBank: wangwu

//let con2 = new CommercialBank("广大银行", "万绿园");

// 3.泛型工厂函数
function createInstanceFactory2<T>(Constructor: { new(...arg: any): T }):T {
  console.log(Constructor.name + "被创建对象");
  return new Constructor("广大银行", "万绿园");
}
// type 或者interface 
// 
let con3 = createInstanceFactory2<CommercialBank>(CommercialBank)
con3.loan();

export { }