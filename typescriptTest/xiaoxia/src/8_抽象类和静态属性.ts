class Grid {
  static origin = { x: 0, y: 0 }
  calculateDistanceFromOrigin(point: { x: number; y: number }) {
    let xDist = point.x - Grid.origin.x
    let yDist = point.y - Grid.origin.y
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale
  }
  constructor(public scale: number) {}
}

let grid1 = new Grid(1.0) // 1x scale
let grid2 = new Grid(5.0) // 5x scale

console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }))
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }))
// ######################################################################
// 抽象类做为其它派生类的基类使用。 抽象类不能直接被实例化。
// 不同于接口，抽象类可以包含成员的实现细节。
// abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。
// 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。
//  抽象方法的语法与接口方法相似。 两者都是定义方法签名但不包含方法体。
// 然而，抽象方法必须包含 abstract关键字并且可以包含访问修饰符。
// 抽象类与接口十分相似
abstract class Anim {
  abstract makeSound(): void
  move(): void {
    console.log('roaming the earch...')
  }
}

class Anaconda extends Anim {
  makeSound(): void {
    throw new Error('Method not implemented.')
  }

  extra(): void {}
}

// 类定义会创建两个东西：类的实例类型和一个构造函数。

// let snake: Anaconda
let snake = new Anaconda()
