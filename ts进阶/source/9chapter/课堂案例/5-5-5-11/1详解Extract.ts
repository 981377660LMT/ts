//  泛型约束 

// 慕课网 TS 高级课程 =>(1) 详解 Extract的使用

class People {
  public name!: string;
  public age!: number
  public address!: string
  eat() {

  }
}

class ChinesePeople extends People {
  private phone!: string

}

let cp = new ChinesePeople();

// Extract 是TS提供的一个TS高级type类型【简称TS高级类型】
type Extract<T, U> = T extends U ? T : never

// Extract 在 父类和子类中应用 
// 定律：子类  extends 父类=>子类 extends 父类永远返回true=>返回T类型
type extractType = Extract<ChinesePeople, People> // ChinesePeople

// 定律: 父类  extends 子类=>父类 extends 子类返回false 因为父类继承子类本身不成立，所以一般都为false
//  但如果希望人为制造一个true 获取到People
// 那只有子类实例属性或实例方法个数必须和父类一样多
type extractType2 = Extract<People, ChinesePeople> // never






export { }




// 父类 extends 子类 如果 父类和子类的属性和方法一样多 那么就输出People 返回true 
// 但如果子类比父类属性多，那么结果就返回false 输出never