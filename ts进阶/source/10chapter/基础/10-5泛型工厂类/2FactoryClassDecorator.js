"use strict";
//  1.  拷贝第五章继承源码代码
let __extends = (function (Son, Parent) {

  function getStaticExtendsWithForIn (Son, Parent) {
    for (let key in Parent) {
      if (Object.prototype.hasOwnProperty.call(Parent, key)) {
        Son[key] = Parent[key]
      }
    }
  }

  function getStaticExtendsWithObjectkeys (Son, Parent) {
    Object.keys(Parent).forEach((key) => {
      Son[key] = Parent[key]
    })
  }

  function getStaticExtendsWithProto (Son, Parent) {
    Son.__proto__ = Parent;
  }

  let MyextendStatics = function (Son, Parent) {
    let MyextendStatics = Object.setPrototypeOf || getStaticExtendsWithForIn ||
      getStaticExtendsWithObjectkeys || getStaticExtendsWithProto
    return MyextendStatics(Son, Parent)
  }

  return function (Son, Parent) {
    MyextendStatics(Son, Parent)
    function Middle () {
      this.constructor = Son;
    }
    if (Parent) {//如果不为空 如果父类存在
      Middle.prototype = Parent.prototype;
      Son.prototype = new Middle()
    } else {// 如果父类不存在
      Son.prototype = Object.create(null)
    }
    console.log("Object.create(null):", Object.create(null));
  }
}())
// . 底层JS 组合装饰器和目标类 __decorate函数
var __decorate = (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    // argsnum 参数个数
    var argsnum = arguments.length;
    console.log("argsnum:", argsnum)
    // targetinfo 被装饰器修饰的目标【本案例为类】
    // argsnum=2 装饰器修饰的是类或者构造器参数，targetinfo=target[类名]
    // argsnum=4 装饰器修饰的是方法【第四个参数desc等于null] targetinfo=该方法的数据属性【desc = Object.getOwnPropertyDescriptor(target, key) 】
    // argsnum=3 装饰器修饰的是方法参数或者属性,targetinfo=undefined
    var targetinfo = argsnum < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;//S100
    console.log("targetinfo:", targetinfo);
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
          console.log("decorator(targetinfo):", decorator(targetinfo))
          targetinfo = (argsnum < 3 ? decorator(targetinfo) : argsnum > 3 ?
            decorator(target, key, targetinfo) : decorator(target, key)) || targetinfo;
          console.log("targetinforesult:", targetinfo)
        }
      }
    return argsnum > 3 && targetinfo && Object.defineProperty(target, key, targetinfo), targetinfo;
  }
// 底层JS 组合装饰器和目标类 __decorate函数结束
Object.defineProperty(exports, "__esModule", { value: true });
// 需求：对已经开发好的项目中的任何一个类，创建实例时，
// 打印日志信息，
// 输出哪一个类被创建了,并输出传递了哪些参数信息
// let obj:object={name:"wangwu"}
// obj.name
//  1.完成日志信息的装饰器
function LoggerInfoDecorator (targetClass) {
  var LoggerSonClass = /** @class */ (function (_super) {
    __extends(LoggerSonClass, _super);
    function LoggerSonClass () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var _this = _super.apply(this, args) || this;
      console.log("日志信息...targetClass:", targetClass.name);
      return _this;
    }
    return LoggerSonClass;
  }(targetClass));
  return LoggerSonClass;
}
// 2. 目标类
// 类型 "typeof LoggerSonClass" 没有调用签名。
var Test = /** @class */ (function () {
  // 1.先执行原来构造函数
  function Test (name) {
    this.name = name;
  }
  Test.prototype.eat = function () {
    console.log(this.name, "吃饭");
  };
  Test = __decorate([
    LoggerInfoDecorator
  ], Test);
  return Test;
}());
var test = new Test("wer"); //LoggerSonClass
test.eat();
