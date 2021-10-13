let peopleObj = {
  name: '小张',
  ppl_age: this.age,
  eat (address, who) {
    //peopleObj.eat.call(myobj, "王府井", 38)执行以后的输出结果
    // console.log("this:", this)//{ name: '小王', age: 98 }
    // console.log("this.name:", this.name)
    this.address = address;
    this.who = who;
    console.log("this:", this);
    console.log(this.name + " 年龄:"
      + this.age + " 和" + this.who + " 在" + this.address + "吃饭")
    return 3;
  }
}


let myobj = {
  name: '小王',
  age: 98
}
console.log("myobj1:", myobj)
// call和apply方法的使用
// peopleObj.eat.call(myobj, "王府井", 38)
// console.log("myobj2:", myobj)

peopleObj.eat.apply(myobj, ["王府井", 38])//apply传递的是数组
console.log("myobj2:", myobj)


