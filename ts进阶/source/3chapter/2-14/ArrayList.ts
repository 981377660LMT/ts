//  1.对现有的数组进行封装，让数组增删改变得更加好用
//  2.提供get方法 remove方法 显示方法【add方法】
// 其中需求中的remove方法有两个，我们用方法重载来实现

class ArrayList {
  //第一步：定义一个引用属性【数组】
  constructor(public element: Array<object>) {

  }
  // 第二步：根据索引来查询数组中指定元素
  get(index: number) {
    return this.element[index]
  }

  // 第三步: 显示方法
  show() {
    this.element.forEach((ele) => {
      console.log(ele);
    })
  }

  remove(value: number): number
  remove(value: object): object
  //remove(value: number | object): number | object {
  remove(value: any): any {
    this.element = this.element.filter((ele, index) => {
      //如果是根据数字【元素索引】去删除元素，remove方法返回的是一个数字
      if (typeof value === "number") {
        return value !== index
      } else {
        // 如果是根据对象去删除元素，remove方法返回的是一个对象
        return value !== ele
      }
    })
    return value;
  }

}

let stuOne = { stuname: "wnagwu", age: 23 }
let stuTwo = { stuname: "lisi", age: 39 }
let stuThree = { stuname: "liuqi", age: 31 }

let arrayList = new ArrayList([stuOne, stuTwo, stuThree]);
arrayList.show();

console.log("删除第一个学生");
// let value = arrayList.remove(0)
// console.log("删除的元素为第:", value, "学生")
// arrayList.show();
let value = arrayList.remove(stuTwo)
console.log("删除的学生对象为:", value)
arrayList.show();
// 如果是根据数字【元素索引】去删除元素，remove方法返回的是一个数字
// 如果是根据对象去删除元素，remove方法返回的是一个对象
//let value=arr.remove(1)
