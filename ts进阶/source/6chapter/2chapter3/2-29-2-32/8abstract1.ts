abstract class People {//抽象类
  constructor() {

  }
  public name: string
  abstract eat(): void 
  //抽象方法 特点 1：没有方法体 2：带abstract关键字

  public step() {
    console.log("双腿走路");
  }
}
//let people2 = new People();//无法创建抽象类的实例

class AmericanPeople extends People {
  eat(): void {
    throw new Error('Method not implemented.');
  }

  public phone: string

}


class ChinesePeople extends People { //中国人
  public eat() {
    console.log("用筷子吃饭...");
  }
}

class TuzhuPeople extends People { // 土族人
  public eat() {
    console.log("用手抓吃饭...");
  }
}

let people: People = new AmericanPeople();


export { }