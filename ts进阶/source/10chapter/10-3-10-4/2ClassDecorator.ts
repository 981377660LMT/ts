// 带参数的装饰器
function FirstClassDecorator(params: any) {
  console.log("params:", params);
  return function (targetClass: any) {
    let targetClassObj = new targetClass();
    targetClassObj.buy();
  }
}
//{new (...args:any)=>CustomerService} //=typeof CustomerService
// 类型“typeof CustomerService”的参数不能赋给类型“string”的参数
@FirstClassDecorator("我是用来修饰CustomerService类的装饰器参数")
class CustomerService {
  name: string = "下单"
  constructor() {

  }
  buy() {
    console.log(this.name + "购买");
  }
  placeOrder() {//下单
    console.log(this.name + "下单购买");
  }
}

export { }