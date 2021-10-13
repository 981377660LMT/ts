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

// 通用函数类型
type commonFunc = (...args: any) => any//S100
// interface commonFuncInter {
//   eat: (...args: any) => any
// }
interface commonFuncInter {//S101 效果等价于S100 接口重载
  (...args: any): any
}
let func: commonFuncInter = function (count: string, money: number): void {

}

//CommercialBank 双重性质  1.类构造函数对象变量  2.创建类对象的一个类型【new 后面出现的就是】
//CommercialBank.count
let cb = new CommercialBank("df", "sdf");


//CommercialBank

// str==CommercialBank
//let str:string="abc"
function CommercialBank_(name: string, address: string) {

}
// 工厂函数类型[代表任意一个类构造函数对象变量【等价JS的构造函数】的函数类型。]
// new 不是创建的意思，而是表示后面的类型是一个类构造函数对象变量的类型【类构造函数的类型】
type constructor = new (...args: any) => any// 工厂函数类型
//type constructor=new (...args:any)=>CommercialBank
// function test(){

// }
//let t=new test();//在TS不能直接new一个函数来创建实例【对象】


export { }
