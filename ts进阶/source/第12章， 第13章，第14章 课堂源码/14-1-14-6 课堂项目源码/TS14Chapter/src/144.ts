// type 定义基础类型
type num = number
let price: num = 3

type BaseType = string | number | symbol
//let data:BaseType=Symbol()


//  type 定义联合类型例子2：
// interface Car { brandNo: string }
// interface Plane { No: string; brandNo: string }
// type TypVechile = Car | Plane
// let vechile: TypVechile = { No: "110S"; brandNo: "直升飞机" }

interface Car { brandNo: string }
interface Plane { No: string; brandNo: string }
type TypVechile = [Car, Plane]
let vechile: TypVechile = [{ "brandNo": "奥迪" }, { No: "110S", brandNo: "直升飞机" }]

type Group = { groupName: string, memberNum: number }
type GroupInfoLog = { info: string, happen: string }
type GroupMemeber = Group & GroupInfoLog// type 交叉类型合并

let data: GroupMemeber = {
  groupName: "001", memberNum: 10,
  info: "集体爬山", happen: "中途有组员差点滑落,有惊无险",
}


interface Error {
  name: string;
}

interface Error {
  message: string;
  stack?: string;
}
// 接口合并
let error: Error = {
  message: "空指针",
  name: "NullPointException"
}

export { }
