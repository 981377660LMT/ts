"use strict";
// 1. 底层JS 组合装饰器和目标类 __decorate函数
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  // argsnum 参数个数
  var argsnum = arguments.length;
  // targetinfo 被装饰器修饰的目标【类或属性或方法或方法参数，本案例为类】
  // argsnum=2 装饰器修饰的是类或者构造器参数，targetinfo=target[类名]
  // argsnum=4 装饰器修饰的是方法【第四个参数desc等于null] targetinfo=该方法的数据属性【desc = Object.getOwnPropertyDescriptor(target, key) 】
  // argsnum=3 装饰器修饰的是方法参数或者属性,targetinfo=undefined
  var targetinfo = argsnum < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;//S100
  console.log("1.targetinfo:", targetinfo)//undefined
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
function UrlParam (params) {
  return function paramDecorator (targetClassPrototype, methodname, paramindex) {
    console.log("targetClassPrototype:", targetClassPrototype);
    console.log("methodname:", methodname);
    console.log("paramindex:", paramindex);
    targetClassPrototype.info = params;
  };
}
var People = /** @class */ (function () {
  function People () {
  }
  People.prototype.eat = function (address, who) {
    console.log("address:", address);
  };
  __decorate([
    __param(1, UrlParam("地址信息"))
  ], People.prototype, "eat");
  return People;
}());
