function QQUsers (QQNo_, QQAge_, QQMark_) {
  this.QQNo = QQNo_;//QQ号
  this.QQAge = QQAge_;//Q龄
  //this.QQMark = QQMark_;//QQ标签
}


QQUsers.prototype.commonfriends = ['骑驴看海', '大漠上的英雄', '坚实的果子', '小草']
QQUsers.prototype.show = function () {
  console.log(`QQ号:${this.QQNo},QQ龄:${this.QQAge},QQ标注:${this.QQMark}`)
  console.log(`共同的好友是:${this.commonfriends}`);
}
let QQZhangSan = new QQUsers("37834522", 15, "王阳明传人")
let QQLisi = new QQUsers("30424232", 10, "袁隆平的徒弟")
console.log("QQLisi:", QQLisi)
console.log("QQLisi.commonfriends:", QQLisi.commonfriends)
//console.log("QQZhangSan.QQMark:", QQZhangSan.QQMark)
console.log("QQZhangSan.commonfriends:", QQZhangSan.commonfriends)
//let obj = {username:"wangwu"}
//obj.age=23
//console.log(obj);
//let obj2=new Object();
console.log("QQUsers.prototype:", QQUsers.prototype);

// QQUsers.prototype={
//   constructor: ƒ QQUsers(QQNo_, QQAge_, QQMark_)
//   __proto__: Object
//   }
