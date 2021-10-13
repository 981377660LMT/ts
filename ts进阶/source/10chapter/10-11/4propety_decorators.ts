function loginProperty(attrValue: any) {
  return function (targetclassPrototype: any, attrname: string | symbol) {
    console.log("targetclassPrototype：", targetclassPrototype);
    console.log("attrname：", attrname);
    targetclassPrototype.constructor.custLevelDescri = function () {
      console.log("消费5000元升级为贵宾");
      console.log("消费10000元升级为贵宾,赠送微波炉一个");
    }
    console.log("targetclassPrototype.custLevelDescri", targetclassPrototype.custLevelDescri);
  }
}

class CustomerService {

  public custname: string = "王五"

  @loginProperty("顾客登记")
  public degree!: string
  constructor() {
  }

  show() {
    console.log("顾客名:", this.custname)
  }
}

//(CustomerService as any).custLevelDescri()

export { }