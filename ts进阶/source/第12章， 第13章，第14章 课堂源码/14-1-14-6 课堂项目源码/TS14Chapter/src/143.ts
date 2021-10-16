
// 指多个类型的合并类型
// 1. 基本数据类型的联合类型

function add(previous: string | number, current: string | number) {
  
}


// 2. 引用类型的联合类型
interface Car {
  brand: string;//  品牌
  No: number;// 车牌号
  price: number;
  placeOrigin: string;//产地
  load(): void
}

interface Plane {
  category: string;// 飞机类别
  price: number;// 价格
  placeOrigin: string;// 产地
  airline: string;// 所属航空公司
  load(): void
}

function carry(vechile: Car | Plane) {// 运载
  vechile.load();
}