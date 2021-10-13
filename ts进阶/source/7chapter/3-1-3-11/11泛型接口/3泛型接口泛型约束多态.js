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
exports.__esModule = true;
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
        // this.safeShow();// 寄生组合继承模式 middle()
        _super.prototype.calculateRent.call(this); //=Vechile.prototype.calculateRent.call(this)
        console.log("Car:", Car.count);
        console.log("this.brand:", this.brand);
        this.total += this.days * this.getPriceByType();
        return this.total;
    };
    Car.prototype.checkIsWeigui = function (isOverWeight) {
        if (isOverWeight) {
            this.total += this.total + 500;
        }
    };
    return Car;
}(Vechile));
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
        this.total += this.days * this.getPriceBySeatNum();
        return this.total;
    };
    Bus.prototype.checkIsOverNum = function (isOverWeight) {
        if (isOverWeight) {
            this.total += this.total + 2000;
        }
    };
    return Bus;
}(Vechile));
var Truck = /** @class */ (function (_super) {
    __extends(Truck, _super);
    function Truck(brand_, type_, days_, deposit_, ton_) {
        var _this = _super.call(this, brand_, type_, days_, deposit_) || this;
        _this.ton = ton_;
        if (_this.ton < 300 || _this.ton > 2000) {
            throw new Error("吨数在300-2000吨之间");
        }
        return _this;
    }
    Truck.prototype.checkIsOverWeight = function (isOverWeight) {
        if (isOverWeight) {
            console.log("超载了");
            this.total += this.total + 2000;
        }
        return this.total;
    };
    Truck.prototype.getPriceByTon = function () {
        var rentMoneyByDay = 0; //每天的租金
        if (this.ton <= 500) { //500吨
            rentMoneyByDay = 750;
        }
        else if (this.ton > 500) {
            rentMoneyByDay = 1350;
        }
        return rentMoneyByDay;
    };
    Truck.prototype.calculateRent = function () {
        this.total += this.getPriceByTon() * this.days;
        console.log("卡车:", this.total);
        return this.total;
    };
    Truck.prototype.calDesposit = function () {
        return this.deposit;
    };
    return Truck;
}(Vechile));
var Customer = /** @class */ (function () {
    function Customer() {
    }
    //  public  rentVechile(vechile:Vechile){
    //       vechile.calculateRent();
    //  }
    Customer.prototype.rentVechile = function (myVechileArray) {
        var total = 0;
        myVechileArray.forEach(function (vechile) {
            total += vechile.calculateRent();
        });
        return total;
    };
    return Customer;
}());
// let vechile0: Vechile = new Bus("大巴", "京3A556", 3, 50000, 67);
// let vechile1: Vechile = new Truck("大卡车", "京7A556", 2, 60000, 1500);
// let vechile2: Bus = new Bus("大巴", "京3A556", 3, 50000, 67);
// //let vechileArray: Vechile[] = [vechile0, vechile1, vechile2]
// let vechileArray: Vechile[]=[]
// //vechileArray[0]=vechile0
// vechileArray[0] = new Bus("大巴", "京3A556", 3, 50000, 67);
// vechileArray[1] = new Truck("大卡车", "京7A556", 2, 60000, 1500);
// vechileArray[2] = new Bus("大巴", "京3A556", 3, 50000, 67);
//一个父类数组对象变量的每一个元素都可以接受任何一个该父类的子类对象
var vechileArray = [];
//let vechileArray: (Car | Bus | Truck)[] = []
vechileArray[0] = new Bus("大巴", "京3A556", 3, 50000, 67);
vechileArray[1] = new Truck("大卡车", "京7A556", 2, 60000, 1500);
var cust = new Customer();
var lasttotal = cust.rentVechile(vechileArray);
console.log("lasttotal:", lasttotal);
