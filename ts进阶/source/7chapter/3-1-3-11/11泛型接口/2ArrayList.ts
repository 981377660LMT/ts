import List from './List'
import LinkedList from './2LinkedList'
/**
 * 把Array数组改写重构提升为Java简易版的ArrayList
 */
export default class ArrayList<T> implements List<T> {
  //第一步：定义一个引用属性【数组】
  public array: Array<T>
  constructor() {
    this.array = [];
  }

  public index: number = 0;


  size() {
    return this.index ? this.index : 0
  }
  // 往数组中添加元素
  public add(ele: T) {
    //console.log("this.kk * 3:", this.kk * 3);
    this.checkIndex();
    this.array[this.index++] = ele;
  }
  public checkIndex() {
    if (this.index < 0) {
      throw new Error("数组下标不能为零");
    }
  }
  // 第二步：根据索引来查询数组中指定元素
  get(index: number): T {

    return this.array[index];

  }

  // 第三步: 显示方法
  show() {
    this.array.forEach((ele) => {
      console.log(ele);
    })
  }

  remove(value: number): number
  remove(value: T): T
  //remove(value: number | object): number | object {
  remove(value: any): any {
    this.array = this.array.filter((ele, index) => {
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
// 多态体现在： 1.父类对象变量可以接受任何它的子类对象  
//  2. 接口类型对象变量可以接受任何它的实现类的对象
let arrayList: List<string> = new LinkedList<string>();
arrayList.add("王五");
arrayList.add("吴俊泽");
arrayList.add("张海同");
arrayList.add("周陈平");
arrayList.add("陈平");
arrayList.add("霍东阁")
arrayList.add("张洪海")
//arrayList.get(0).length

export { }

