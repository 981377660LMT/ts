function People (name, sex, phone) {//父类 【父构造函数】
  this.name = name;
  this.sex = sex;
  this.phone = phone;
}

People.prototype.doEat = function () {
  console.log(this.name + "吃饭...")
}

function ChinesePeople (name, sex, phone, national) {//ChinesePeople子类【子构造函数】

  People.call(this, name, sex, phone)
  this.national = national;//民族
}

ChinesePeople.prototype.getHukou = function () {
  console.log("Hukou");
}
// ES6( Object.setPrototypeOf方法)
// Object.setPrototypeOf() 为现有对象设置原型，返回一个新对象
// 接收两个参数：第一个是现有对象，第二是原型对象。
// 返回的新对象newmiddle和第二个原型对象关系为
// newmiddle.__proto__=parent.prototype
// 由于setPrototypeOf的作用
//  middle.__proto__= parent.prototype
//  newmiddle最终的结果就是middle
function _extends (son, parent) {//继承

  return Object.setPrototypeOf(son.prototype, parent.prototype)
  //son.prototype.__proto__ = parent.prototype
  ChinesePeople.prototype.__proto__ = People.prototype
}

_extends(ChinesePeople, People);
//let middle = _extends(People);
//ChinesePeople.prototype = middle
//ChinesePeople.prototype.constructor = ChinesePeople//需要额外增加子构造函数指向的原型对象空间中的constructor属性

// chinesePeopleTwo.__proto__ = ChinesePeople.prototype
// chinesePeopleTwo.__proto_.__proto__ = ChinesePeople.prototype.__proto__
let chinesePeopleTwo = new ChinesePeople("王海", "男", "1111", "汉族");
let chinesePeopleOne = new ChinesePeople("约克夏", "女", "1111", "傣族");
chinesePeopleTwo.getHukou();
console.log("chinesePeopleOne:", chinesePeopleOne);
console.log("chinesePeopleTwo:", chinesePeopleTwo);


