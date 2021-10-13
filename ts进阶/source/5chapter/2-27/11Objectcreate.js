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


function _extends (parent) {//继承
  let middle = Object.create(parent.prototype, {
    count: {
      writable: true,
      value: 23
    }
  })
  return middle;
}

const middle = _extends(People);
ChinesePeople.prototype = middle
ChinesePeople.prototype.constructor = ChinesePeople//需要额外增加子构造函数指向的原型对象空间中的constructor属性


let chinesePeopleTwo = new ChinesePeople("王海", "男", "1111", "汉族");
let chinesePeopleOne = new ChinesePeople("约克夏", "女", "1111", "傣族");
chinesePeopleTwo.getHukou();
console.log("chinesePeopleOne:", chinesePeopleOne);
console.log("chinesePeopleTwo:", chinesePeopleTwo);


