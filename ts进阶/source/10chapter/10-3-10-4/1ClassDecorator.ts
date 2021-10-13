// 不带参数的装饰器
function FirstClassDecorator(targetClass: ) {
  let targetClassObj = new targetClass();
  targetClassObj.buy();
  console.log("targetClass.name:", targetClass.name);
}
function SecondClassDecorator(targetClass: any) {
  let targetClassObj = new targetClass();
  targetClassObj.buy();
  console.log("targetClass.name:", targetClass.name);
}

@FirstClassDecorator
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