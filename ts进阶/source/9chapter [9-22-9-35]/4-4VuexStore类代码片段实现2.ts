// 初步理解Vuex源码片段【	 4 Vuex 中 Store 类代码片段实现】，后面我们会手写源码
// 热身准备 [分解讲解]:
//   1. 对象类型中的属性key的类型为函数类型
//   2. class类中的实例属性的类型为函数类型
//   3. Vuex 底层源码中的 Store 类源码片段中的语法理解
//   4. Vuex底层源码中的 StoreOptions 接口中的 actions 属性语法理解【ActionTree】
//   5. 把 StoreOptions 接口作为 Store 构造函数的参数 
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
let { commit: mycommit }: CustObjType = {
  custname: "abc",
  degree: 23,
  commit: function (type: string, payload: any) {//S100
    console.log(type, "：", payload)
  }
}
// login ： { username: '猪八戒', address: 'beijing' }
//custobj.commit("login", { username: "猪八戒", address: "beijing" })
// function funcone({ commit: mycommit }: CustObjType, two: string) {
//   mycommit("funcone=>login", { username: "猪八戒", address: "beijing" })
// }
// function funcone1({ commit: commit }: CustObjType, two: string) {
//   mycommit("funcone=>login", { username: "猪八戒", address: "beijing" })
// }
function funcone2({ commit }: CustObjType, two: string) {
  // 执行 S100这个函数
  commit("funcone2=>login", { username: "猪八戒", address: "beijing" })
}
funcone2(custobj, "abc")
//   2. class类中的实例属性的类型为函数类型



export { }