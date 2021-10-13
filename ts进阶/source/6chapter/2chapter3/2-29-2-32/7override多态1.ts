class People {
  public name: string
  public eat() {
    console.log("People父类的eat")
  }
}

class AmericanPeople extends People { // 美国人
  public phone: string
  public eat() {
    console.log("用叉子吃饭...");
  }
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
// 父类的对象变量people可以接受任何一个子类的对象,
// 例如可以接受AmericanPeople,ChinesePeople,TuzhuPeople子类对象
let people: People = new AmericanPeople();
// 从而用这个父类的对象变量来调用子类中重写的方法而输出不同的结果.
people.eat();
people = new ChinesePeople();
people.eat();
people = new TuzhuPeople();
people.eat();
