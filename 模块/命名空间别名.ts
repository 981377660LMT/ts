namespace Shapes {
  export namespace Polygons {
    export class Triangle {}
    export class Square {}
  }
}

// 使用 import q = x.y.z 给常用的对象起一个短的名字
import polygons = Shapes.Polygons
let sq = new polygons.Square() // Same as "new Shapes.Polygons.Square()"
