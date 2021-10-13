
class People {
  public name!: string;
  public age!: number
  public address!: string
  eat() {

  }
}

class ChinesePeople extends People {
  public national!: string

}
// 类型断言 在父类和子类如何断言
let people: People = new People();
let ChinesePeople2 = people as ChinesePeople// 父类对象变量断言成子类类型 成立

let americanPeople: ChinesePeople = new ChinesePeople();
let p: People = americanPeople as People;// 子类对象变量断言成父类类型 成立

export { }

//2从结果上详细对比Extract泛型约束和类型断言[父子类].ts