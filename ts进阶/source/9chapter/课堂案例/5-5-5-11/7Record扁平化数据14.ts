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

// 实际开发为什么我们在显示数据，数据扁平化时用Record
//  原因1：是因为Record有多种实现方式，比如S100实现方式，Map就需要改底层源码才能做到【一般是不会改的】
// // type Record<T> = {// S100
//   [P in keyof any]: T
// }
// 原因2：Record是属于一个轻量级的type类型,Map相对Record是重量级
//  而且Map需要new出来的，所以要更加占用内存空间
// 如果读取数据和显示数据频繁，就应该采用Record
//  如果增删改比较多，那还是使用Map
type resultGoodsType = Record<Goods>
let goodMap = new Map<any, Goods>();
let good: Goods = { [goodSymid]: 101, "name": "苹果", "price": 9 }
goodMap.set(103, good)
goodMap.set("香蕉", good)
goodMap.set(good[goodSymid], good);

// Record类型对于取出来的对象，可以自动提示输出对象的属性和方法
// for (let goodid in goodRecord) {
//   let good = goodRecord[goodid];
//   console.log(goodid, ":", good)
// }

export { }