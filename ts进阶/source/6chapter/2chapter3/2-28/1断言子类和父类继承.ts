
class People {
  public myusername!: string;
  public myage!: number;
  public address!: string
  public phone: string
  constructor() {

  }
  eat() {

  }
  step() {
    console.log("People=>step");
  }

}

class Stu extends People {
  public username!: string
  public age!: number;
  public address!: string// 类型 "Stu" 中缺少属性 "address"，但类型 "typestu2" 中需要该属性。t

  constructor(username: string, age: number, address: string, public phone: string) {
    //  super(username, age);
    super();
    this.address = address;
  }
  study() {

  }

}



let people = new People()

//let result = people as Stu;// 类型断言 正确
let result = <Stu>people;// 类型转换 正确
result.study();

let stu = new Stu("wangwu", 23, "北京", "123")
let result2=stu as People;// 正确


export { }





// 类型断言中的不能相互重叠问题:
//   两个类之间断言的规则:
//   两个类中任意一个的属性和方法是另一个类的属性和方法完全相同或子集，则这两个类可以相互断言
//   否则这两个类就不能相互断言