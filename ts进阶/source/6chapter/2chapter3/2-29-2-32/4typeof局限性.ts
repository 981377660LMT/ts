class StringUtil {//工具类

  public static trimSpace(str: string): string {
    return str.replace(/\s+/g, "")
  }
}
let su = new StringUtil();

console.log(typeof su);//object
console.log(typeof new StringUtil());//object
console.log(Object.prototype.toString.call(su))//[object Object]
if (su instanceof StringUtil) {
  console.log("su:","instanceof")
}
// let arr = new Array([]);
// let arr2 = [];
// console.log(" typeof arr:", typeof arr);
// console.log("typeof new Array([]):", typeof new Array([]));
// console.log("typeof []", typeof []);

let set = new Set([3, 4])
console.log(typeof set)//object
console.log(Object.prototype.toString.call(set));//[object Set]
console.log(Object.prototype.toString.call(new Set([3, 4])))//[object Set]

console.log(Object.prototype.toString.call([]));//[object Array]
console.log(Object.prototype.toString.call(new Array([])));//[object Array]