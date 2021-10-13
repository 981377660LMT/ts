export {}
interface ShapeParms_Inter {
  height?: number
  width?: number
  radius?: number
  isShapObj: boolean
}

function isShapeObj(obj: any): obj is ShapeParms_Inter {
  return Boolean(obj && obj.isShapObj === true)
}

class Square {
  public height: number
  public width: number

  constructor(width?: number, height?: number)
  constructor(shapeAreaParms?: ShapeParms_Inter)
  constructor(value_?: any, value2_?: number) {
    //shapeAreaParms: ShapeParms_Inter | undefined

    if (isShapeObj(value_)) {
      this.height = value_.height || 0
      this.width = value_.width || 0
    } else {
      this.width = value_ || 0
      this.height = value2_ || 0
    }
  }

  getArea() {
    return this.width * this.height
  }
  // 下面这个错误
  // constructor()//此重载签名与其实现签名不兼容 为什么会不兼容呢？
  // // 重载签名中有一个必选参数shapeAreaParms
  // // 那么当外部使用constructor()来创建实例时
  // //  因为shapeAreaParms既然是必选参数变量 这个变量就不可能为undefined
  //        那么constructor()时表达的是shapeAreaParms参数为undefined
  //     这其实就是不兼容 [你要必选 不能undefined 而我只能为undefined]
  //
  // constructor(shapeAreaParms?: ShapeParms_Inter)
  // constructor(shapeAreaParms: ShapeParms_Inter, width?: number, height?: number) {//shapeAreaParms: ShapeParms_Inter | undefined
  //   // S100...
  //   //if (typeof shapeAreaParms !== "undefined") {
  //   if (shapeAreaParms) {
  //     this.height = shapeAreaParms.height || 0
  //     this.width = shapeAreaParms.width || 0
  //   } else {
  //     this.width = width || 0;
  //     this.height = height || 0
  //   }
  //   //S108
  // }

  //下面这个错误
  //constructor(shapeAreaParms: ShapeParms_Inter)//此重载签名与其实现签名不兼容
  // 为什么错误呢? 那么当外部使用constructor(shapeAreaParms: ShapeParms_Inter)来创建实例时,
  // width和height必然为undefined 但是T99却必须要提供width和height,这就导致不兼容
  //   // 那么当遇到width和height参数时,
  //   constructor(shapeAreaParms: ShapeParms_Inter, width: number, height: number) {//T99//shapeAreaParms: ShapeParms_Inter | undefined
  //     // T100...
  //     //if (typeof shapeAreaParms !== "undefined") {
  //     if (shapeAreaParms) {
  //       this.height = shapeAreaParms.height || 0
  //       this.width = shapeAreaParms.width || 0
  //     } else {
  //       this.width = width || 0;
  //       this.height = height || 0
  //     }
  //     //T108
  //   }
  // }
}

let shapeParms_Inter: ShapeParms_Inter = { width: 30, height: 50, isShapObj: true }
let square1 = new Square(shapeParms_Inter)
console.log(square1)
let square2 = new Square(9, 5)
console.log(square2.getArea()) //1500
