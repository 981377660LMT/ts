// 一个鸭子超类 (Superclass)，并让各种鸭子继承此超类。
abstract class Duck {
  // 鸭子超类 （抽象基类）
  constructor() {}
  quack() {
    /*呱呱叫*/
  } // 每只鸭子都会呱呱叫由超类实现
  // 增加 fly() 方法
  fly() {
    /*让鸭子飞起来*/
  }
  swim() {
    /*游泳戏水*/
  } // 每只鸭子都会游泳由超类实现
  public abstract display(): void // 每只鸭子的颜色不一样由子类具体实现
}
class MallardDuck extends Duck {
  // 绿头野鸭
  constructor() {
    super()
  }
  display() {
    // 外观是绿头
  }
}
class RedHeadDuck extends Duck {
  // 红头鸭
  constructor() {
    super()
  }
  display() {
    // 外观是红头
  }
}
class RubberDuck extends Duck {
  // 橡皮鸭
  constructor() {
    super()
  }
  // 橡皮鸭不会飞...
  fly() {
    // 覆盖 fly() 方法
    // 什么都不做
  }
  quack() {
    /*吱吱叫*/
  }
  display() {}
}
// 当鸭子类越来越多功能也越来越丰富时，
// 改变会牵一发而动全身，造成其他鸭子不想要的改变，并且运行时的行为不容易改变。
// 所以我们要设计易扩展的程序将将经常要改变的代码抽离出来抽象成变量或者类来代替，不能写死。
// 继承不能很好的解决问题，因为鸭子的行为在子类不断的改变，
// 而 继承的代码不是在父类写死，就是在子类写死 。
// 设计原则: 找出应用中可能需要改变的地方，
// 把它们独立出来，不要和那些需要变化的代码混在一起 。
// 其实AOP可以解决

// 针对接口编程而不是针对实现编程 。
interface QuackBehavior {
  quack(): void
}

class Quack implements QuackBehavior {
  quack() {
    /*实现呱呱叫*/
  }
}

class Squeak implements QuackBehavior {
  quack() {
    /*实现吱吱叫*/
  }
}

class MuteQuack implements QuackBehavior {
  quack() {
    /*什么都不做，不会叫*/
  }
}

interface FlyBehavior {
  fly(): void
}

class FlyWithWings implements FlyBehavior {
  fly() {
    /*实现飞行*/
  }
}

class FlyNoWay implements FlyBehavior {
  fly() {
    return undefined // 什么都不做，不会飞
  }
}
