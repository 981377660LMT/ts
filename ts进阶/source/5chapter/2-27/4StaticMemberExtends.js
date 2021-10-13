function RootClass () {

}
RootClass.rootname = "rootname"


function People (name, sex, phone) {//父类 【父构造函数】
  this.name = name;
  this.sex = sex;
  this.phone = phone;
}
People.__proto__ = RootClass
//TS类 双重性质  即是类型【new实例时TS类是类型】 当用TS类直接获取属性时就是对象

//JS函数 双重性质  即是类型【new实例时JS函数也是类型】 当用JS类直接获取属性时就是对象
//  JS函数为对象时，可以获取哪些属性呢？【包括prototype,__proto__,自己定义的静态属性】
People.count = 300;// 静态属性 相当于TS类中static属性
People.commonDescribe = function () {// 静态方法 相当于TS继承中static方法
  console.log("需要守法")
}
//People.__proto__
People.prototype.doEat = function () {
  console.log(this.name + "吃饭...")
}
let people = new People("wangw", 23, "111");
console.log("people:", people)
function ChinesePeople (name, sex, phone, national) {//ChinesePeople子类【子构造函数】

  People.call(this, name, sex, phone)
  this.national = national;//民族
}

// ES6之前的实现
// 第一种方式 ：函数以对象形式呈现时，上面自有属性就是静态属性，上面自有方法就是静态方法
// for (let key in People) {//自有属性 还会查找__proto__指向的对象空间【这里是rootClass函数对象空间】中自有属性
//   console.log("key:", key);//静态属性和静态方法
// }

for (let key in People) {//自有属性 还会查找__proto__指向的对象空间【这里是rootClass函数对象空间】中自有属性
   if (Object.prototype.hasOwnProperty.call(People, key)) {//要求返回true的条件是本构造函数的自有属性 不会查找__proto__指向的对象空间【这里是rootClass函数对象空间】中自有属性
  //console.log("key:", key);//静态属性和静态方法
  ChinesePeople[key] = People[key]//子类ChinesePeople继承父类People的静态属性和静态方法
  }
}
// 第二种实现方式 
// Object.keys(People).forEach((key) => {
//   ChinesePeople[key] = People[key]
// })

// 第三种实现方式
//ChinesePeople.__proto__ = People

//ES6 第四种实现方式
Object.setPrototypeOf(ChinesePeople, People)// 最终建立的关系是ChinesePeople.__proto__ = People

console.log("ChinesePeople.count:", ChinesePeople.count);
console.log("ChinesePeople.rootname:", ChinesePeople.rootname);

ChinesePeople.commonDescribe();

let chinesePeopleTwo = new ChinesePeople("王海", "男", "1111", "汉族");

console.log("chinesePeopleTwo:", chinesePeopleTwo);
//console.log("chinesePeopleTwo.count:", chinesePeopleTwo.count);


