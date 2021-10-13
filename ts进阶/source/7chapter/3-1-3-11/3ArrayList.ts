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

//let arrayList = new ArrayList([stuOne, stuTwo, stuThree]);
let arrayList = new ArrayList<number>();
arrayList.add(3)

console.log(arrayList.get(0));

let arrayList2 = new ArrayList();
arrayList2.add(3)

//let arrayList3 = new ArrayList<typeof stuOne>();
let arrayList3 = new ArrayList<stuType>();
arrayList3.add(stuOne)
arrayList3.add(stuTwo)
arrayList3.add(stuThree)

let stuobj = arrayList3.get(1)
console.log(stuobj.stuname);

//泛型如果在使用时没有具体化的类型,并且定义泛型时使用了T=any,那么就会选择any数据类型
let arrayList5 = new ArrayList();
arrayList5.add(3)
arrayList5.add("abc");
arrayList5.add(stuOne);
//arrayList5.get(0).
let stuObj2 = arrayList5.get(2);
console.log("stuObj2.stuname:", stuObj2.stuname)
export { }

