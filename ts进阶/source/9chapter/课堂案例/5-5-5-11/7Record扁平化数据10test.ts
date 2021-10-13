// type testType = {
//   name: string,
//   [x: number]: any
// }
// //let testobj:testType={name: "wangwu",101:"ere","103":"df","d104":"df"}
type testType = {
  name: string,
  [x: string]: any
}
//[x: string] 可以代表[x: string] 也可以表示[x: number]
//   [x: string]可以是字符串类型，数字类型 symbol类型
const goodSymid = Symbol("goodid")
let testobj: testType = {
  name: "wangwu",
  101: "ere", "103": "df", age: "df", goodSymid: "kkk"
}
