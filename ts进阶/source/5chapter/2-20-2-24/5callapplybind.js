let peopleObj = {
  name: '小张',
  ppl_age: this.age,
  eat (name, age) {
    this.name = name;
    this.age = age;
    console.log("this:", this);
    console.log(this.name + " 年龄:"
      + this.age + " 和" + this.who + " 在" + this.address + "吃饭")
    return 3;
  }
}

function chinesePeople (name_, age_, address, who) {
  this.address = address;
  this.who = who;

}

let chinseobj = new chinesePeople("wangwu", 23, "bejing", "ok")


let myobj = {
  username: '小王',
  age: 98
}

