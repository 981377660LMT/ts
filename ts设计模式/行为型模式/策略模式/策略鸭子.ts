type FLYBEHAVIOR = FlyBehavior // 飞行联合类型
type QUACKBEHAVIOR = QuackBehavior // 嘎嘎叫联合类型
/**
 * 鸭子超类 （抽象基类）
 * @class Duck
 **/
abstract class Duck {
  public abstract flyBehavior: FlyBehavior // 拥有一个抽象的飞行行为不涉及具体实现
  public abstract quackBehavior: QuackBehavior // 拥有一个抽象的嘎嘎叫行为不涉及具体实现
  public abstract display(): void // 拥有一个显示外观的抽象函数
  constructor(flyBehavior: FlyBehavior, quackBehavior: QuackBehavior) {
    // 新建Duck时支持可选的2个参数
    this.setFlyBehavior(flyBehavior)
    this.setQuackBehavior(quackBehavior)
  }
  setFlyBehavior(flyBehavior: FLYBEHAVIOR) {
    // 设置具体飞行行为
    this.flyBehavior = flyBehavior
  }
  setQuackBehavior(quackBehavior: QUACKBEHAVIOR) {
    // 设置具体嘎嘎叫行为
    this.quackBehavior = quackBehavior
  }
  performFly() {
    // 执行飞行行为
    this.flyBehavior.fly()
  }
  performQuack() {
    // 执行嘎嘎叫行为
    this.quackBehavior.quack()
  }
}

/**
 * 鸭子超类 （抽象基类）
 * @class MallardDuck
 **/
class MallardDuck extends Duck {
  // 绿头野鸭
  public flyBehavior: FlyBehavior
  public quackBehavior: QuackBehavior
  constructor(...rest) {
    super(...rest)
  }
  display() {
    console.log('显示绿色')
  }
}

let mallardDuck = new MallardDuck() // 新建一个不具备任何行为的绿头野鸭

let flyWithWings = new FlyWithWings() // 飞行

mallardDuck.setFlyBehavior(flyWithWings) // 设置飞行行为

let quack = new Quack() // 呱呱叫行为

mallardDuck.setQuackBehavior(quack) // 设置呱呱叫行为

// 这样我们就可以随意组合已经存在的任意飞行行为和各种叫声

// 测试一下

mallardDuck.performFly() //执行飞行

mallardDuck.performQuack() //执行叫声

//我们甚至可以更改绿头野鸭的叫声
let squeak = new Squeak() // 吱吱叫

mallardDuck.setQuackBehavior(squeak) // 设置吱吱叫到绿头野鸭上

mallardDuck.performQuack() //执行叫声

// 相关代码在同级目录有已经转义的js
export {}

// 设计原则: 多用组合，少用继承。“有一个”可能比“是一个”更好。
