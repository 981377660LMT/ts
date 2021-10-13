//5-3constructorparam.ts准备
class ChinesePeople {// 准备类
  public name: string
  public sex: string
  public phone: string
  public national: string

  constructor(name: string, sex: string, phone: string, national: string) {
    this.name = name;
    this.sex = sex
    this.phone = phone
    this.national = national
  }
  eat() {

  }
}
// 一个类的构造函数的类型表示1：new (name: string, sex: string, phone: string,
//  national: string) => ChinesePeople
//  S99前面的ChinesePeople也是一个函数对象变量
let MyChinesePeople: new (name: string, sex: string, phone: string,
  national: string) => ChinesePeople = ChinesePeople//S99
//new MyChinesePeople(....);//=new ChinesePeople(....);
// 一个类的构造函数的类型表示2： typeof ChinesePeople
//  typeof ChinesePeople //ChinesePeople是一个构造函数对象变量
let MyChinesePeople12: typeof ChinesePeople = ChinesePeople
//new MyChinesePeople12()//=new =new ChinesePeople(....);
let cp = new MyChinesePeople12("wangwu", "男", "1111", "汉族");
cp.eat();
let MyChinesePeople2: new (...args: any[]) => any = ChinesePeople
//new MyChinesePeople2(...);//=new ChinesePeople(...);

type Constructor<T> = new (...args: any[]) => T
// ChinesePeople是为了具体化泛型T的一个类型
let MyChinesePeople3: Constructor<ChinesePeople> = ChinesePeople



export { }