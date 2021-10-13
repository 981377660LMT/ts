// Record和object,Map区别
// 定义Goods接口
const goodSymid = Symbol("goodid")
interface Goods {
  [goodSymid]: number
  name: string
  price: number
}
type Record<T> = {// S100
  [P in keyof any]: T
}

type resultGoodsType = Record<Goods>
let goodRecord: Record<Goods> = {}
let good: Goods = { [goodSymid]: 101, "name": "苹果", "price": 9 }

goodRecord[103] = good;
goodRecord["香蕉"] = good
goodRecord[good[goodSymid]] = good
console.log("goodRecord:", goodRecord);
// Record类型对于取出来的对象，可以自动提示输出对象的属性和方法
for (let goodid in goodRecord) {
  let good = goodRecord[goodid];
  console.log(goodid, ":", good)
}

export { }


// 编译器尝试从object上查找103属性,但object什么属性和方法都没有，只是单纯表示一个对象的类型
// Object也不行，因为也没有103属性