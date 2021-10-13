// 定义Goods接口
const goodSymid = Symbol("goodid")
interface Goods {
  [goodSymid]: number
  name: string
  price: number
}

// 实现数据扁平化 [准备]
// Record类型
// // S100输出的结果: type Record<{
//   name: T;
//   price: T;
//   [goodSymid]: T;
// }
// type Record<T> = {// S100
//   [P in keyof Goods]: T
// }
type Record<T> = {// S100
  [P in keyof any]: T
}
// type Record2<T> = {
//   [x: string]: T,// 字符串索引可以是数字类型,可以是字符串类型，最终都会转换为字符串类型
//   //[x: number]: T,// 字符串索引可以是数字类型 [x: number]可以最终合成一个数组的索引
//  //[x:symbol]:T//索引签名参数类型必须为 "string" 或 "number"
// }
type resultGoodsType = Record<Goods>
//let goodRecord: Record<string | number, Goods> = {}
let goodRecord: Record<Goods> = {}
let good: Goods = { [goodSymid]: 101, "name": "苹果", "price": 9 }
//{101: { [goodSymid]: 101, "name": "苹果", "price": 9 },
//香蕉: { [goodSymid]: 101, "name": "苹果", "price": 9 },
//}
goodRecord[103] = good;
goodRecord["香蕉"] = good
goodRecord[good[goodSymid]] = good
//输出结果:goodRecord: { '101': { name: '苹果', price: 9, [Symbol(goodid)]: 101 } }
console.log("goodRecord:", goodRecord);


export { }