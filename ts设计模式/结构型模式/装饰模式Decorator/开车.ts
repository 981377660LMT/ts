// 装饰模式 Decorator
// 特点：在不改变接口的情况下，装饰器通过组合方式引用对象，并由此在保持对象原有功能的基础上给对象加上新功能。
// 用处：当需要不影响现有类并增加新的功能时，可以考虑装饰模式，它可以动态透明的给对象增加功能。
// 注意：与继承的优劣。 AOP/OOP

// 现在有一辆小轿车，加速到100km/h需要10秒：
interface Movable {
  accelerate(): void
}

class Car implements Movable {
  accelerate() {
    console.log('加速到100km/h需要10秒')
  }
}

// 现在想改装下，提高加速度，加个涡轮增压器。
class TurboCharger {
  use() {
    console.log('使用涡轮增压')
  }
}

class RefittedCar implements Movable {
  private turboCharger = new TurboCharger()
  constructor(private car: Car) {}

  accelerate() {
    this.car.accelerate()
    this.turboCharger.use()
    console.log('加速到100km/h需要5秒')
  }
}

let refitterCar = new RefittedCar(new Car())
refitterCar.accelerate()
// 这样改装后的车用的还是原来的接口，但新对象却可以在保持原对象的功能基础上添加新的加速功能。
// 代码实现的特点主要还是在于使用同样接口，并在新对象里有对原对象Car的引用，这样才能使用原对象的功能。
// 上面的功能其实通过继承也很容易做到：
class RefittedCar_ extends Car {
  private turboCharger = new TurboCharger()

  accelerate() {
    super.accelerate()
    this.turboCharger.use()
    console.log('加速到100km/h需要5秒')
  }
}

let refitterCar_ = new RefittedCar_()
refitterCar_.accelerate()

// 对比看下各自的优缺点：（装饰器用的是组合） 继承的优点是 直观，容易理解，
// 缺点是继承链太长的话将很难维护，并且耦合度较高，相对死板，不够灵活。
// 组合的优点是 灵活，但如果装饰器本身也比较多且复杂时，代码的复杂度也会增加不少。
// 就我个人来说在这种场景下还是用组合比较舒服，不是很喜欢在已经使用的类上继承出子类。
// 接上面的例子，有个皮卡也要增加加速功能，继承的话又得再实现一个皮卡子类，
// 而用装饰模式的话使用时传进来就好了，本身不需要做任何更改。
