function QQUsers (QQNo_, QQAge_, QQMark_) {
  this.QQNo = QQNo_;//QQ号
  this.QQAge = QQAge_;//Q龄
  this.QQMark = QQMark_;//QQ标签
}
//方法栈--执行方法时的栈区

QQUsers.prototype.commonfriends = ['骑驴看海', '大漠上的英雄', '坚实的果子', '小草']
QQUsers.prototype.show = function () {
  console.log(`QQ号:${this.QQNo},QQ龄:${this.QQAge},QQ标注:${this.QQMark}`)
  console.log(`共同的好友是:${this.commonfriends}`);
}

let QQZhangSan = new QQUsers("37834522", 15, "王阳明传人")
let QQLisi = new QQUsers("30424232", 10, "袁隆平的徒弟")
//QQUsers.prototype.commonfriends.push("大树");
console.log(QQZhangSan.commonfriends);
console.log(QQLisi.commonfriends);

QQUsers.prototype = {
  commonfriends: ["abc", "bcd", '骑驴看海']
}

console.log("QQUsers.prototype:", QQUsers.prototype)
console.log("QQZhangSan.commonfriends:", QQZhangSan.commonfriends)
console.log("QQUsers.prototype.commonfriends:", QQUsers.prototype.commonfriends)

// let obj = { username: "wangwu", age: 23 }
// let objnew = obj;

// obj = { address: "北京海淀区西三环", age: 39 }
// console.log("obj:", obj);
// console.log("obj2:", objnew)


//obj.username = "lisi"
//obj.phone = "123"
// let objnew = new Object();
// objnew.username = "王五"
// objnew.age = 33
// console.log("objnew:", objnew);
//let obj={}