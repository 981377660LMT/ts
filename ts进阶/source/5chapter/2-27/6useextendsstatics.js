let extendStatics = require('./6myextendsStatics')
function People (name, sex, phone) {//父类 【父构造函数】
  this.name = name;
  this.sex = sex;
  this.phone = phone;
}

People.count = 300;
function ChinesePeople (name, sex, phone, national) {//ChinesePeople子类【子构造函数】

  People.call(this, name, sex, phone)
  this.national = national;//民族
}
extendStatics(ChinesePeople, People)
console.log("ChinesePeople.count:", ChinesePeople.count)







