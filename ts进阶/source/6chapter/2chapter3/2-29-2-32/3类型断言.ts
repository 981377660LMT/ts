//  大厂TS类型守卫晋级考核题【综合题】:
//  请编写一个操作对象方法和属性的函数实现以下功能
//   1. 当对象字符串属性有空格时就去掉空格后输出.
//   2. 当遇到对象方法时就执行,其他数据类型的属性一律直接输出
//   3.只有对象中包含allowoutput属性时,才允许输出。
//   4. 函数接收到外部传入的null,undefined,{}时，直接输出不是一个合法的对象。
//  考核点：1. 考核对类型守卫的熟练运用程度 2.静态方法  
interface TestInter {
  username: string,
  age: number,
  eat(): void,
  allowinput?: 1
}

class StringUtil {//工具类

  public static trimSpace(str: string): string {
    return str.replace(/\s+/g, "")
  }

}
let testobj: TestInter = {
  username: " wan  g wu",
  age: 23,
  eat() {
    console.log(StringUtil.trimSpace(this.username) + " 吃饭")
  },
  allowinput: 1
}



function processObjOutput(obj: any) {
  // if(obj===undefined || obj===null){

  // }

  if (obj && "allowinput" in obj) {// 判断allowinput属性或者方法在ojb对象中是否存在
    let value;
    Object.keys(obj).forEach((key) => {
      value = obj[key];
      if (typeof value === "string") {//把变量的范围缩小为string类型在语句块内使用该数据类型
        console.log(key + ":", StringUtil.trimSpace(value));
      } else if (typeof value === "function") {
        console.log("value:", value)
        obj[key]();
      } else {
        console.log(key + ":", +value)
      }
      // console.log(key + ":" + obj[key]);
    })
  } else {
    console.log("不是一个合法的对象。")
  }
}
// processObjOutput(testobj)

processObjOutput(undefined)

export { }