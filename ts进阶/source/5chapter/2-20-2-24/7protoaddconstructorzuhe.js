function Parent (name, age) {
  this.name = name
  this.age = age
  // console.log("this:", this)
  console.log("this.name:", this.name)
}
Parent.prototype.friends = ["xiaozhang", "xiaoli"]
Parent.prototype.eat = function () {
  console.log(this.name + " 吃饭");
}
function Son (name, age, favor, sex) {
  this.favor = favor // 兴趣爱好
  this.sex = sex
  Parent.call(this, name, age)// TS继承中使用super
}
Son.prototype = new Parent("temp", 3);
Son.prototype.constructor = Son

let sonobj2 = new Son("lisi", 34, "打篮球", "男");
//console.log("sonobj2:", sonobj2)
//console.log("sonobj2.friends:", sonobj2.friends);//undefined

// let sonobj3 = new Son("tianping", 34, "打篮球", "男");
// console.log("sonobj3:", sonobj3)
// console.log("sonobj3.friends:", sonobj3.friends);//undefined


