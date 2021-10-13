// 定义Goods接口
const goodSymid = Symbol("goodid")
interface Goods {
  [goodSymid]: number
  name: string
  price: number
}

// 模拟后台取出来的商品数据列表
const goodsList: Goods[] = [
  {
    [goodSymid]: 101,
    "name": "苹果",
    "price": 9
  },
  {
    [goodSymid]: 102,
    "name": "香蕉",
    "price": 3
  },
  {
    [goodSymid]: 103,
    "name": "橘子",
    "price": 3
  }
]
// 把 goodsList扁平化成下面的对象格式
//{ '101': { name: '苹果', price: 9, [Symbol(goodid)]: 101 } 
//'102': { name: '香蕉', price: 3, [Symbol(goodid)]: 101 },
// '103': { name: '橘子', price: 3, [Symbol(goodid)]: 101 },
// }
// 实现数据扁平化
// Record类型
type Record<K extends keyof any, T> = {
  [P in K]: T
}
type resultGoodsType = Record<number, Goods>
let goodRecord: Record<number, Goods> = {}
goodsList.forEach((goods) => {
  goodRecord[goods[goodSymid]] = goods;
})
// //goodRecord: {
//   '101': { name: '苹果', price: 9, [Symbol(goodid)]: 101 },
//   '102': { name: '香蕉', price: 3, [Symbol(goodid)]: 102 },
//   '103': { name: '橘子', price: 3, [Symbol(goodid)]: 103 } 
// }
console.log("goodRecord:", goodRecord)
//goodRecord[101]
for (let goodid in goodRecord) {
  console.log(goodid, ":", goodRecord[goodid])
}
export { }