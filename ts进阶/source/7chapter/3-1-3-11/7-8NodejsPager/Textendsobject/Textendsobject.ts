class Container<T extends object>{
  t!: T;
  constructor(t_: T) {
    this.t = t_;
  }
  show(): T {
    console.log(this.t);
    return this.t;
  }
}


let obj2: object = { username: "lisi", age: 23 }
let c = new Container<object>(obj2)//object可以具体化T extends object,T就是object类型
c.show();

type objtype = { username: string, age: number }

let obj: objtype = { username: "wangwu", age: 23 }
//obj as object// 类型断言
let obj3 = <object>obj;//类型转换
let c2 = new Container<objtype>(obj)//objtype可以具体化T extends object,具体化后T就是objtype类型
c2.show();

class Customer { // js function Customer(){} new Object()
  constructor(public name: string) {

  }
}
let cust = new Customer("wangwu");

let c3 = new Container<Customer>(cust)
c3.show();


