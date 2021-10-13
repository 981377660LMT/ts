// 1.  类丶属性丶方法 丶参数装饰器组合案例实现   2.  执行顺序 
// 属性装饰器--第一个方法参数装饰器-->第一个方法装饰器->......->构造器参数装饰器->类装饰器
function firstMethodDecorator(targetClassPrototype: any,
  methodname: string) {
  console.log("=============执行第一个方法装饰器==============")
  console.log("类名:", targetClassPrototype)//  类原型对象变量   URLInfo { show: [Function] }
  console.log("方法名:", methodname);//key
}


function secondMethodDecorator(params: string) {
  return function (targetClassPrototype: any, methodname: string) {
    console.log("=============执行第二个方法装饰器==============")
    console.log("类名:", targetClassPrototype)//  类原型对象变量   URLInfo { show: [Function] }
    console.log("方法名:", methodname);//key
  }
}

function paramDecorator(targetClassPrototype: any, paramname: string, paramindex: number) {
  console.log("=============执行参数装饰器==============")
  console.log("targetClassPrototype:", targetClassPrototype);
  console.log("参数名:", paramname);
  console.log("参数索引:", paramindex);
}


function UrlPropDecorator(targetClassPrototype: any, attrname: any) {

  console.log("=============执行属性装饰器==============")
  console.log("targetClassPrototype:", targetClassPrototype);
  console.log("属性名:", attrname);
}


function URLInfoDecorator(targetClassPrototype: any) {
  console.log("==========类装饰器============")
  console.log("targetClassPrototype:", targetClassPrototype);
}

function constructorDecorator(params: any) {
  return function (targetClassPrototype: any, paramname: string, paramindex: number) {
    console.log("==========构造器参数装饰器============")
    console.log("构造器参数装饰器", targetClassPrototype);
    console.log("构造器参数名为:", paramname);
    console.log("构造器参数索引位置:", paramindex);
  }
}

@URLInfoDecorator
class URLInfo {
  constructor(@constructorDecorator("url") public uri: string) {

  }

  @UrlPropDecorator
  public url: string = "https://www.imooc.com"


  @firstMethodDecorator
  methodOne(@paramDecorator data: string) {
    console.log("this:", this);
    console.log("目标类:", this.uri)
  }

  @secondMethodDecorator("yes")
  methodTwo(@paramDecorator address: string) {
    console.log(address)
  }
}
export { }