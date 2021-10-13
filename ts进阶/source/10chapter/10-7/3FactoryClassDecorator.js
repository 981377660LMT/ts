"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// 需求：对已经开发好的项目中的任何一个类，创建实例时，
// 打印日志信息，
// 输出哪一个类被创建了,并输出传递了哪些参数信息
// let obj:object={name:"wangwu"}
// obj.name
//  1.完成日志信息的装饰器
function LoggerInfoDecorator(targetClass) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            console.log("日志信息...targetClass:", targetClass.name);
            return _this;
        }
        class_1.prototype.methodone = function () {
            console.log("methodone:", this.name);
        };
        return class_1;
    }(targetClass));
    //return LoggerSonClass
}
// 2. 目标类
// 类型 "typeof LoggerSonClass" 没有调用签名。
var Test = /** @class */ (function () {
    // 1.先执行原来构造函数
    function Test(name) {
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
test.methodone();
