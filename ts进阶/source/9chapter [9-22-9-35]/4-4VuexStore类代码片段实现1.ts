// 初步理解Vuex源码片段【	 4 Vuex 中 Store 类代码片段实现】，后面我们会手写源码
// 热身准备 [分解讲解]:
//   1. 对象类型中的属性key的类型为函数类型
//   2. class类中的实例属性的类型为函数类型
//   3. Vuex 底层源码中的 Store 类源码片段中的语法理解
//   4. Vuex底层源码中的 StoreOptions 接口中的 actions 属性语法理解【ActionTree】
//   5. 把 StoreOptions 接口作为 Store类 构造函数的参数 
//   6. createStore方法的实现

//   1. 对象类型中的属性key的类型为函数类型
type funcType2 = (one: CustObjType, two: string) => void
type CustObjType = { custname: string, degree: number, commit: Commit }

type Commit = (type: string, payload?: any) => void;
let custobj: CustObjType = {
  custname: "abc",
  degree: 23,
  commit: function (type: string, payload: any) {
    console.log(type, "：", payload)
  }
}
// login ： { username: '猪八戒', address: 'beijing' }
//custobj.commit("login", { username: "猪八戒", address: "beijing" })
function funcone(custobj_: CustObjType, two: string) {
  console.log("funcone:", custobj_.custname);
  custobj_.commit("funcone=>login", { username: "猪八戒", address: "beijing" })
}
funcone(custobj, "abc")
//   2. class类中的实例属性的类型为函数类型
export { }


