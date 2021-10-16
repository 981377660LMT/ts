// 1. 底层JS 组合装饰器和目标类 __decorate函数
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  // argsnum 参数个数
  var argsnum = arguments.length;
  // targetinfo 被装饰器修饰的目标【类或属性或方法或方法参数，本案例为类】
  // argsnum=2 装饰器修饰的是类或者构造器参数，targetinfo=target[类名]
  // argsnum=4 装饰器修饰的是方法【第四个参数desc等于null] targetinfo=该方法的数据属性【desc = Object.getOwnPropertyDescriptor(target, key) 】
  // argsnum=3 装饰器修饰的是方法参数或者属性,targetinfo=undefined
  var targetinfo = argsnum < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;//S100
  // decorator保存装饰器数组元素
  var decorator;
  // 元数据信息,支持reflect-metadata元数据
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
    targetinfo = Reflect.decorate(decorators, target, key, desc);
  } else
    //  装饰器循环,倒着循环,说明同一个目标上有多个装饰器，执行顺序是倒着执行
    for (var i = decorators.length - 1; i >= 0; i--) {
      if (decorator = decorators[i]) {
        // 如果参数小于3【decorator为类装饰器或者构造器参数装饰器】执行decorator(targetinfo)直接执行decorator装饰器，并传递目标targetinfo，这里是类
        // 如果参数大于3【decorator为方法装饰器】 直接执行 decorator(target, key, targetinfo) 
        // 如果参数等于3 【decorator为方法参数装饰器或者属性装饰器】 直接执行decorator(target, key)
        // targetinfo最终为各个装饰器执行后的返回值,但如果没有返回值,直接返回第S100行的targetinfo
        targetinfo = (argsnum < 3 ? decorator(targetinfo) : argsnum > 3 ?
          decorator(target, key, targetinfo) : decorator(target, key)) || targetinfo;
        console.log("targetinforesult:", targetinfo)
      }
    }
  return argsnum > 3 && targetinfo && Object.defineProperty(target, key, targetinfo), targetinfo;
}
// 底层JS 组合装饰器和目标类 __decorate函数结束
var __param = (this && this.__param) || function (paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
// 1.  类丶属性丶方法 丶参数装饰器组合案例实现   2.  执行顺序 
function firstMethodDecorator (targetClassPrototype, methodname) {
  console.log("=============执行第一个方法装饰器==============");
  console.log("类名:", targetClassPrototype); //  类原型对象变量   URLInfo { show: [Function] }
  console.log("方法名:", methodname); //key
}
function secondMethodDecorator (params) {
  return function (targetClassPrototype, methodname) {
    console.log("=============执行第二个方法装饰器==============");
    console.log("类名:", targetClassPrototype); //  类原型对象变量   URLInfo { show: [Function] }
    console.log("方法名:", methodname); //key
  };
}
function paramDecorator (targetClassPrototype, paramname, paramindex) {
  console.log("=============执行参数装饰器==============");
  console.log("targetClassPrototype:", targetClassPrototype);
  console.log("参数名:", paramname);
  console.log("参数索引:", paramindex);
}
function UrlPropDecorator (targetClassPrototype, attrname) {
  console.log("=============执行属性装饰器==============");
  console.log("targetClassPrototype:", targetClassPrototype);
  console.log("属性名:", attrname);
}
function URLInfoDecorator (targetClassPrototype) {
  console.log("==========类装饰器============");
  console.log("targetClassPrototype:", targetClassPrototype);
}
function constructorDecorator (params) {
  return function (targetClassPrototype, paramname, paramindex) {
    console.log("==========构造器参数装饰器============");
    console.log("构造器参数装饰器", targetClassPrototype);
    console.log("构造器参数名为:", paramname);
    console.log("构造器参数索引位置:", paramindex);
  };
}
var URLInfo = /** @class */ (function () {
  function URLInfo (uri) {
    this.uri = uri;
    this.url = "https://www.imooc.com";
  }
  URLInfo.prototype.methodOne = function (data) {
    console.log("this:", this);
    console.log("目标类:", this.uri);
  };
  URLInfo.prototype.methodTwo = function (address) {
    console.log(address);
  };
  __decorate([
    UrlPropDecorator
  ], URLInfo.prototype, "url");
  __decorate([
    firstMethodDecorator,
    __param(0, paramDecorator)
  ], URLInfo.prototype, "methodOne");
  __decorate([
    secondMethodDecorator("yes"),
    __param(0, paramDecorator)
  ], URLInfo.prototype, "methodTwo");
  URLInfo = __decorate([
    URLInfoDecorator,
    __param(0, constructorDecorator("url"))
  ], URLInfo);
  return URLInfo;
}());
