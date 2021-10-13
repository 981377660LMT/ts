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
// Record和object区别
// 区别1：Record 获取到是索引参数类型，所以可以赋初值为{} 
// 而object也可以，但是再次赋值，比如： goodRecord[103] = good2;
//   会出现错误，会查找103属性是否存在于object类型的对象变量中

// 区别2： Record是泛型，获取值可以有自动提示功能，而object无法实现自动提示。
type resultGoodsType = Record<Goods>
let good: Goods = { [goodSymid]: 101, "name": "苹果", "price": 9 }
// let  obj={} 这样一种情况
// let goodRecord = { name: "wangwu", 103: good }
// let good2: Goods = { [goodSymid]: 101, "name": "苹果", "price": 9 }

// goodRecord[103] = good2;// 修改103的值为good2,而不能增加103属性名【key],js可以增加
// goodRecord["香蕉"] = good
// goodRecord[good[goodSymid]] = good



let goodRecord: Object = { name: "wangwu", 103: good }

let good2: Goods = { [goodSymid]: 101, "name": "苹果", "price": 9 }

// 编译器尝试从object上查找103属性,
// 但object什么属性和方法都没有，只是单纯表示一个对象的类型
// Object也不行，因为也没有103属性,直接抛出  类型“Object”上不存在属性“103”。ts(7053)
// goodRecord[103] = good2;// 修改103的值为good2,而不能增加103属性名【key],js可以增加
// goodRecord["香蕉"] = good
// goodRecord[good[goodSymid]] = good
// console.log("goodRecord:", goodRecord);
// // Record类型对于取出来的对象，可以自动提示输出对象的属性和方法
// for (let goodid in goodRecord) {
//   let good = goodRecord[goodid];
//   console.log(goodid, ":", good)
// }

export { }


