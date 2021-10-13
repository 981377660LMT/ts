// 和数据表对应的一个实体.
export class Food {// 食物类
// 数据传送的载体 
  constructor(public foodid: string, public shop: string,
    public foodName: string) {

  }

}

export class Flower {// 花类

  constructor(public name: string, price: number) {

  }

}



export class Customer {// 顾客类

  constructor(public custName: string, public custAge: number) {

  }

}