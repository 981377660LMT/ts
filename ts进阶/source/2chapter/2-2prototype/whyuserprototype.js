function QQUsers(QQNo_, QQAge_, QQMark_) {
  this.QQNo = QQNo_ //QQ号
  this.QQAge = QQAge_ //Q龄
  this.QQMark = QQMark_ //QQ标签
  //引用对象类型=引用类型=对象类型=引用数据类型
  // 数组也是一种引用数据类型
  this.commonfriends = ['骑驴看海', '大漠上的英雄', '坚实的果子', '小草'] //共同好友
  // 方法也是一种引用数据类型
  this.show = function () {
    console.log(`QQ号:${this.QQNo},QQ龄:${this.QQAge},QQ标注:${this.QQMark}`)
    console.log(`共同的好友是:${this.commonfriends}`)
  }
}
// 对象也叫实例(instance)
// QQZhangSan叫做对象变量 对象是等号右边通过new出来的一个实例 而且是运行期间才在堆中开辟对象的内存空间
let QQZhangSan = new QQUsers('37834522', 15, '王阳明传人')
let QQLisi = new QQUsers('30424232', 10, '袁隆平的徒弟')
//let QQLiuwu = new QQUsers("刘武", 12, "飞起来的鸭子")

QQZhangSan.show()
QQLisi.show()
//QQLiuwu.show();
