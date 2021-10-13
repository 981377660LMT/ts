//  姓名，年龄,地址,身份证号码,联系方式,家庭地址,微信号
class Person {//属性

  //public  name:string |undefined//typescript4.0之前属性如果没有赋值的解决方法 增加一个undefined数据类型
  // 类上定义的属性一定是描绘这个类本身特征的变量，不能把一些无关的变量定义成类属性
  public name: string = "noname"//赋初值为noname
  public age: number = 0
  public phone: string = "11111"
  public friends: Array<string> = ["df","df"]
  // 对象的变量=实例的变量=类的【非静态的】属性=简称属性
  //  实例属性或者对象属性

  constructor(name_: string, age_: number, phone_: string) {//无参构造器
    this.name = name_;
    this.age = age_;
    this.phone = phone_;
  }

  //function  错误,类中定义方法不能用function
  // public play(): number {
  //   //return "df"//不能将类型“string”分配给类型“number”
  //  // return 3

  // }

  public doEat(who: string, address: string): void {//方法默认的返回值为void
    console.log(`${this.name}和${who}吃饭,在${address}吃饭`);
  }

  public doStep() {

  }
}
//let zhangSanPerson = new Person();
//给对象赋值的两种方式
// 方法1：通过类中属性或者方法来赋值 get/set选择器
// zhangSanPerson.name = "zhangSan"
// zhangSanPerson.age = 23
// zhangSanPerson.phone = "134123123"

// zhangSanPerson.doEat("李四", "王府井")

// 方法2： 通过构造函数 【构造器】来赋值
// 创建对象一共做了三件事
// 第一件事: 在堆中为类的某个对象【实例】分配一个空间
// 第二件事：调用对应的构造函数【构造器】并且把构造器中的各个参数值赋值给对象属性
//   new Person()自动匹配无参数的构造器
// 第三件事：把对象赋值给对象变量 【把实例赋值给实例变量】
let zhangSanPerson = new Person("zhangSan", 23, "134123123");
zhangSanPerson.doEat("李四", "王府井")

console.log(zhangSanPerson)

//let obj={username:"wangwu",playgame(){}}