//  1.对现有的数组进行封装，让数组增删改变得更加好用
//  2.提供get方法 remove方法 显示方法【add方法】
// 其中需求中的remove方法有两个，我们用方法重载来实现

class ArrayList<T = any> {
  //第一步：定义一个引用属性【数组】
  public element: Array<T>
  constructor() {

    this.element = [];
  }
  public index: number = 0;
  // 往数组中添加元素
  public add(ele: T) {
    //console.log("this.kk * 3:", this.kk * 3);
    this.checkIndex();
    this.element[this.index++] = ele;
  }
  public checkIndex() {
    if (this.index < 0) {
      throw new Error("数组下标不能为零");
    }
  }
  // 第二步：根据索引来查询数组中指定元素
  get(index: number): T {

    return this.element[index];

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

type stuType = { stuname: string, age: number, address: string }
let stuOne: stuType = { stuname: "wnagwu", age: 23, address: "beijing" }
let stuTwo: stuType = { stuname: "lisi", age: 39, address: "shanghai" }
let stuThree: stuType = { stuname: "liuqi", age: 31, address: "nanjing" }

// 顾客类
class Customer {
  constructor(public custname: string, public age: number) { }
}
// 顾客类的两个对象
let wangwuCust = new Customer("wangwu", 23);//new Object object
let lisiCust = new Customer("lisi", 23);

let custArrayList = new ArrayList<Customer>();
custArrayList.add(wangwuCust)
custArrayList.add(lisiCust)
//custArrayList.add(3);
//custArrayList.add(true)
let cust = custArrayList.get(0)
console.log(cust.custname)

// ts-node 5any和泛型.ts


export { }

