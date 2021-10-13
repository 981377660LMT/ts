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

var Vechile = (function () {
  function Vechile (brand_, vechileNo_, days_, deposit_) {
    this.brand = brand_;
    this.vechileNo = vechileNo_;
    this.days = days_;
    this.deposit = deposit_;
    //console.log("constructor Vechile=>this.brand:", this.brand);
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
  Vechile.count = 300;
  return Vechile;
}())


var Car = (function (_super) {
  __extends(Car, _super);
  function Car (brand_, vechileNo_, days_, deposit_, type_) {
    _super.call(this, brand_, vechileNo_, days_, deposit_);
    this.type = type_;
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
  Car.prototype.calculateRent = function () {
    _super.prototype.calculateRent.call(this)
    return this.days * this.getPriceByType();
  }
  return Car;
}(Vechile))

var car = new Car("普拉多", "京3A556", 3, 100000, "凯美瑞旗舰版");
console.log(Car.count);
console.log(car.calculateRent());





