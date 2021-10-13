// 慕课网高级TS课程之深度掌握TS继承：
//   逐行深度剖析 + 手写 优化版的TS 继承底层JS 源码 
//  【练就更深厚JS 原型+原型继承功底的绝佳场景 ]
var __extends = (this && this.__extends) || (function () {

  var extendStatics = function (Son, Parent) {
    let myextendStatics = Object.setPrototypeOf ||

      function (Son, Parent) { Son.__proto__ = Parent; } ||
      function (Son, Parent) {
        for (var key in Parent)
          if (Object.prototype.hasOwnProperty.call(Parent, key))
            Son[key] = Parent[key];
      };
    return myextendStatics(Son, Parent);
  };
  return function (Son, Parent) {
    if (typeof Parent !== "function" && Parent !== null)
      throw new TypeError("Class extends value " + String(Parent) + " is not a constructor or null");
    extendStatics(Son, Parent);

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
    // Son.prototype =
    //   Parent === null ? Object.create(null) :
    //     (Middle.prototype = Parent.prototype, new Middle())
  };
})();
exports.__esModule = true;
// 父类：Vechile   交通工具。
var Vechile = /** @class */ (function () {
  function Vechile (brand_, vechileNo_, days_, deposit_) {
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
  function Car (brand_, vechileNo_, days_, deposit_, type_) {
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
    // 对于方法重写后，内部再想调用父类的同名方法时，只可以使用super,不能用this
    // 否则,导致内存溢出，原因是不断递归调用而没有出口导致内存溢出
    //this.calculateRent();
    // this.safeShow();//调用父类safeShow方法，因为Car类原型对象空间中没有该方法，
    //  所以就会查找它的上一级的原型对象空间[Vechile.prototype指向的原型对象空间】中的方法
    //this.safeShow();
    _super.prototype.calculateRent.call(this); //=Vechile.prototype.calculateRent.call(this)
    console.log("Car:", Car.count);
    return this.days * this.getPriceByType();
  };
  return Car;
}(Vechile));
var car = new Car("普拉多", "京3A556", 3, 100000, "凯美瑞旗舰版");
console.log(car.calculateRent());
var Bus = /** @class */ (function (_super) {
  __extends(Bus, _super);
  function Bus (brand_, vechileNo_, days_, deposit_, seatNum_) {
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
