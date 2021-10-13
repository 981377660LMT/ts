"use strict";
// 需求1:汽车租赁功能实现: 有小轿车,大巴,卡车三种类型的车,顾客可以租任意一种或多种不同类型的车,按照租用的天计算租金， 同时为了响应国家对各类车安全的管理, 对在租赁期内有过各种超载，超乘客数，酒后驾车等违规的车需额外支付一定的费用。
// 需求2:计算退回费用：最终退回顾客的费用为押金扣除使用天数，如押金不足需额外支付不足部分。
// 思考小轿车,大巴,卡车共同属性:  品牌 ( brand )  vechileNo ( 车牌号 )  days 
// ( 租赁天数 ) total ( 支付的租赁总费用 )  deposit ( 押金 )
// 思考小轿车,大巴,卡车共同方法: 计算租赁车的价格 ( calculateRent)  
//  支付押金的方法( payDesposit)
// 		安全检测方法（safeShow)
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
exports.__esModule = true;
// 父类：Vechile   交通工具。
var Vechile = /** @class */ (function () {
    function Vechile(brand_, vechileNo_, days_, deposit_) {
        this.total = 0; // 支付的租赁总费用
        this.brand = brand_;
        this.vechileNo = vechileNo_;
        this.days = days_;
        this.deposit = deposit_;
        console.log("constructor Vechile=>this.brand:", this.brand);
    }
    // 计算租赁车的价格 ( calculateRent)
    Vechile.prototype.calculateRent = function () {
        console.log("calculateRent来自Vechile=>this.brand:", this.brand);
        console.log(this.brand + " 车牌号为:" + this.vechileNo + "开始被租");
        return 0;
    };
    //支付押金的方法( payDesposit)
    Vechile.prototype.payDesposit = function () {
        console.log(this.brand + " 车牌号为:" + this.vechileNo + " 支付了:" + this.deposit);
    };
    //  安全检测方法（safeShow)
    Vechile.prototype.safeShow = function () {
        console.log("车规则....");
        console.log(this.brand + " 车牌号为:" + this.vechileNo + " 违规了:");
    };
    Vechile.count = 3;
    return Vechile;
}());
// 子类Car类 独有属性为type_ 
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car(brand_, vechileNo_, days_, deposit_, type_) {
        var _this = 
        //  Vechile.call(this,brand_, vechileNo_, days_, total_, deposit_)
        _super.call(this, brand_, vechileNo_, days_, deposit_) || this;
        _this.type = type_;
        return _this;
    }
    // 根据车的型号来获取租用一天该型号车的租金
    Car.prototype.getPriceByType = function () {
        var rentMoneyByDay = 0; //每天的租金
        if (this.type === "普拉多巡洋舰") {
            rentMoneyByDay = 800;
        }
        else if (this.type === "凯美瑞旗舰版") {
            rentMoneyByDay = 400;
        }
        else if (this.type === "威驰智行版") {
            rentMoneyByDay = 200;
        }
        return rentMoneyByDay;
    };
    // private 是私有的访问修饰符 只允许在本类中方法
    //protected 是受保护的访问修饰符【修饰符是用来控制方法或属性访问的范围】
    // 可以被本类和子类中使用，不能在类的外部使用
    //  public // 可以被本类和子类中使用，也可以在类的外部使用 默认是public
    Car.prototype.calculateRent = function () {
        _super.prototype.calculateRent.call(this); //=Vechile.prototype.calculateRent.call(this)
        console.log("Car:", Car.count);
        console.log("this.brand:", this.brand);
        return this.days * this.getPriceByType();
    };
    return Car;
}(Vechile));
var car = new Car("普拉多", "京3A556", 3, 100000, "凯美瑞旗舰版");
console.log(car.calculateRent());
var Bus = /** @class */ (function (_super) {
    __extends(Bus, _super);
    function Bus(brand_, vechileNo_, days_, deposit_, seatNum_) {
        var _this = 
        //  Vechile.call(this,brand_, vechileNo_, days_, total_, deposit_)
        _super.call(this, brand_, vechileNo_, days_, deposit_) || this;
        _this.seatNum = seatNum_;
        if (_this.seatNum > 200) {
            throw new Error("座位数不能超过200");
        }
        return _this;
    }
    Bus.prototype.getPriceBySeatNum = function () {
        var rentMoneyByDay = 0; //每天的租金
        if (this.seatNum <= 16) {
            rentMoneyByDay = 800;
        }
        else if (this.seatNum > 16) {
            rentMoneyByDay = 1600;
        }
        return rentMoneyByDay;
    };
    Bus.prototype.calculateRent = function () {
        _super.prototype.calculateRent.call(this);
        return this.days * this.getPriceBySeatNum();
    };
    return Bus;
}(Vechile));
