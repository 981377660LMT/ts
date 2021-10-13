class Vechile {
  static count: number = 3;
  public brand: string;// 品牌
  public vechileNo: string;// 车牌号
  public days: number;// 租赁天数
  public total: number = 0;// 支付的租赁总费用
  public deposit: number;// 押金
  constructor(brand_: string, vechileNo_: string, days_: number, deposit_: number) {
    this.brand = brand_;
    this.vechileNo = vechileNo_;

    this.days = days_;
    this.deposit = deposit_;
    console.log("constructor Vechile=>this.brand:", this.brand)
  }
  // 计算租赁车的价格 ( calculateRent)
  public calculateRent() {
    console.log("calculateRent来自Vechile=>this.brand:", this.brand)

    console.log(this.brand + " 车牌号为:" + this.vechileNo + "开始被租");
    return 0;
  }
  //支付押金的方法( payDesposit)
  payDesposit() {
    console.log(this.brand + " 车牌号为:" + this.vechileNo + " 支付了:" + this.deposit);
  }

  //  安全检测方法（safeShow)
  public safeShow() {
    console.log("车规则....");
    console.log(this.brand + " 车牌号为:" + this.vechileNo + " 违规了:");
  }

}

// 子类Car类 独有属性为type_ 
class Car extends Vechile {
  // public brand: string = "nobrand"
  public type: string;//车的型号
  constructor(brand_: string, vechileNo_: string, days_: number,
    deposit_: number, type_: string) {
    //  Vechile.call(this,brand_, vechileNo_, days_, total_, deposit_)
    super(brand_, vechileNo_, days_, deposit_);
    this.type = type_;

  }
  // 根据车的型号来获取租用一天该型号车的租金
  public getPriceByType() {
    let rentMoneyByDay: number = 0;//每天的租金
    if (this.type === "普拉多巡洋舰") {
      rentMoneyByDay = 800;
    } else if (this.type === "凯美瑞旗舰版") {
      rentMoneyByDay = 400;
    } else if (this.type === "威驰智行版") {
      rentMoneyByDay = 200;
    }
    return rentMoneyByDay;
  }

  // private 是私有的访问修饰符 只允许在本类中方法
  //protected 是受保护的访问修饰符【修饰符是用来控制方法或属性访问的范围】
  // 可以被本类和子类中使用，不能在类的外部使用
  //  public // 可以被本类和子类中使用，也可以在类的外部使用 默认是public
  public calculateRent() {//方法重写 [override]
    // this.safeShow();// 寄生组合继承模式 middle()
    super.calculateRent();  //=Vechile.prototype.calculateRent.call(this)
    console.log("Car:", Car.count)
    console.log("this.brand:", this.brand)
    this.total += this.days * this.getPriceByType();
    return this.total;
  }
  checkIsWeigui(isOverWeight: boolean) {
    if (isOverWeight) {
      this.total += this.total + 500;
    }
  }
}

class Bus extends Vechile {
  public seatNum: number // 座位数
  constructor(brand_: string, vechileNo_: string, days_: number,
    deposit_: number, seatNum_: number) {
    //  Vechile.call(this,brand_, vechileNo_, days_, total_, deposit_)
    super(brand_, vechileNo_, days_, deposit_);//使用父类的构造函数的好处
    this.seatNum = seatNum_;
    if (this.seatNum > 200) {
      throw new Error("座位数不能超过200");
    }
  }

  public getPriceBySeatNum() { //计算租赁价格
    let rentMoneyByDay: number = 0;//每天的租金
    if (this.seatNum <= 16) {
      rentMoneyByDay = 800;
    } else if (this.seatNum > 16) {
      rentMoneyByDay = 1600;
    }
    return rentMoneyByDay;
  }
  public calculateRent() {

    super.calculateRent();
    this.total += this.days * this.getPriceBySeatNum();
    return this.total;
  }
  checkIsOverNum(isOverWeight: boolean) {
    if (isOverWeight) {
      this.total += this.total + 2000;
    }
  }
}
import List from './List'
import LinkedList from './2LinkedList';
import ArrayList from './2ArrayList';
class Truck extends Vechile {
  ton!: number // 座位数
  constructor(brand_: string, type_: string,
    days_: number, deposit_: number, ton_: number) {
    super(brand_, type_, days_, deposit_);
    this.ton = ton_;
    if (this.ton < 300 || this.ton > 2000) {
      throw new Error("吨数在300-2000吨之间");
    }
  }

  checkIsOverWeight(isOverWeight: boolean) {
    if (isOverWeight) {
      console.log("超载了");
      this.total += this.total + 2000;
    }
    return this.total;
  }

  getPriceByTon() {//计算租赁价格
    let rentMoneyByDay: number = 0;//每天的租金
    if (this.ton <= 500) {//500吨
      rentMoneyByDay = 750;
    } else if (this.ton > 500) {
      rentMoneyByDay = 1350;
    }
    return rentMoneyByDay;
  }
  public calculateRent() {
    this.total += this.getPriceByTon() * this.days;
    console.log("卡车:", this.total);
    return this.total;
  }
  public calDesposit() {
    return this.deposit;

  }
}

class Customer {

  // public rentVechile(myVechileArray: List<Vechile>) {
  //   let lasttotal = 0;
  //   for (let i = 0; i < myVechileArray.size(); i++) {
  //     lasttotal += myVechileArray.get(i).calculateRent();
  //   }
  //   return lasttotal;
  //   //myVechileArray.calculateRent();
  // }
  public rent<T extends object>(list: List<T>) {
    let lasttotal = 0;
    for (let i = 0; i < list.size(); i++) {
      let something = list.get(i);
      lasttotal += (something as any).calculateRent();
    }
    return lasttotal;
  }

}

// 多态体现在： 1.父类对象变量可以接受任何它的子类对象  
//  2. 接口类型对象变量可以接受任何它的实现类的对象

//let vechileArray: Vechile[] = []
let vechileList: List<Vechile> = new LinkedList<Vechile>();
let bus: Vechile = new Bus("大巴", "京3A556", 3, 50000, 67);
vechileList.add(bus);
vechileList.add(new Truck("大卡车", "京7A556", 2, 60000, 1500));
let cust = new Customer();
let lasttotal = cust.rent<Vechile>(vechileList);
//let lasttotal = cust.rent(vechileList);
console.log("lasttotal:", lasttotal)

//let stringList: List<string> = new ArrayList<string>();
//let dd = cust.rent<string>(stringList);

export { }