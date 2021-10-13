function Person (phone, age) {
  this.age = age;// age实例属性
  this.phone = phone;// phone实例属性
  this.showone = function () { }// showone实例方法
}
Person.prototype.doEat = function () {// 
  console.log("电话：", this.phone)
}


let person = new Person("12344", 23)
console.log("person", person);
console.log("typeof person", typeof person);//object
// new 一个实例对象的底层3步
// 1.创建一个 Object 对象
//var obj = new Object(); 
var obj = {}
//console.log("obj1:", obj);

// 2.让新创建的对象的 __proto__ 变量指向 Person 原型对象空间
obj.__proto__ = Person.prototype;
//console.log("obj2.age:", obj.age);


// // 3.借用Person构造函数中的为 obj 对象变量增加 age 属性和 phone 属性
Person.apply(obj, ["12344", 23]);
console.log("obj3:", obj)
console.log("obj3.age:", obj.age);