//"use strict";
//exports.__esModule = true;
var testobj = {
  username: " wan  g wu",
  age: 23,
  eat: function () {
    console.log("this:", this)
    console.log(this.username + " 吃饭");
  },
  allowinput: 1
};
function processObjOutput (obj) {
  if ("allowinput" in obj) { // 判断allowinput属性或者方法在ojb对象中是否存在
    var value_1;
    Object.keys(obj).forEach(function (key) {
      value_1 = obj[key];
      if (typeof value_1 === "string") { //把变量的范围缩小为string类型在语句块内使用该数据类型
        console.log(key + ":", value_1.replace(/\s+/g, ""));
      }
      else if (typeof value_1 === "function") {
        console.log("value:", value_1);
        //obj[key]();
        value_1();
      }
      else {
        console.log(key + ":", +value_1);
      }
      // console.log(key + ":" + obj[key]);
    });
  }
}
processObjOutput(testobj);
