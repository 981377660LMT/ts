function Parent (name, age) {
  this.name = name
  this.age = age
}
Parent.prototype.friends = ["xiaozhang", "xiaoli"]
Parent.prototype.eat = function () {
  console.log(this.name + " 吃饭");
}
function Son (favor, sex) {
  this.favor = favor // 兴趣爱好
  this.sex = sex
}
let parent = new Parent("王五", 23);
console.log("parent:", parent)
let sonobj = new Son("打篮球", "男");
console.log("sonobj:", sonobj)

console.log("Son.prototype:", Son.prototype)

// 原型链继承
// 继承带来的好处
//  子类对象变量可以访问父类的实例属性
//  子类对象变量可以访问父类原型对象空间中的属性和方法
Son.prototype = new Parent("王六", 38);

Son.prototype.constructor = Son;// 让Son类的对象或函数原型.prototype指向的原型对象空间【new Parent()对象空间】有一个constructor属性
// 指向了Son构造函数对象空间

// let prototype={};
// prototype.constructor="abc"
// 等价于 let prototype={constructor:"abc"} 
//   let prototype=new Object(){constructor:"abc"} 
console.log("Son.prototype 原型链继承之后的指向:", Son.prototype)
let sonobj2 = new Son("打篮球", "男");
console.log("sonobj2:", sonobj2)
console.log("sonobj2访问son类自身的favor属性【构造函数中this定义的对象属性】:",
  sonobj2.favor)
console.log("sonobj2访问son对象原型上的name属性:", sonobj2.name)
console.log("sonobj2访问friends属性:", sonobj2.friends)

//  局限性：不能通过子类构造函数向父类构造函数传递参数 