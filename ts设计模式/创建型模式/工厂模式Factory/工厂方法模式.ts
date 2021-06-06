// 工厂方法模式 Factory Method
// 特点：把工厂抽象出来，让子工厂来决定怎么生产产品, 每个产品都由自己的工厂生产。
// 用处：当产品对象需要进行不同的加工时可以考虑工厂方法。
// 注意：这不是所谓的简单工厂的升级版，两者有不同的应用场景。
interface Shootable {
  shoot(): void
}

abstract class Gun implements Shootable {
  // 抽象产品 - 枪
  abstract shoot(): void
}

class AK47 extends Gun {
  //具体产品 - AK47
  shoot() {
    console.log('ak47 shoot.')
  }
}

class M4A1 extends Gun {
  //具体产品 - M4A1
  shoot() {
    console.log('m4a1 shoot.')
  }
}

////////////////////////////////////////////////////
// 在父类中提供一个创建对象的方法， 允许子类决定实例化对象的类型。
abstract class GunFactory {
  //抽象枪工厂
  abstract create(): Gun
}

class AK47Factory extends GunFactory {
  //Ak47工厂
  create() {
    let gun = new AK47() // 生产Ak47
    console.log('produce ak47 gun.')
    this.clean(gun) // 清理工作
    this.applyTungOil(gun) // Ak47是木头枪托，涂上桐油
    return gun
  }

  private clean(gun: Gun) {
    //清洗
    console.log('clean gun.')
  }

  private applyTungOil(gun: Gun) {
    //涂上桐油
    console.log('apply tung oil.')
  }
}

class M4A1Factory extends GunFactory {
  //M4A1工厂
  create() {
    let gun = new M4A1() // 生产M4A1
    console.log('produce m4a1 gun.')
    this.clean(gun) // 清理工作
    this.sprayPaint(gun) // M4是全金属，喷上漆
    return gun
  }

  private clean(gun: Gun) {
    //清洗
    console.log('clean gun.')
  }

  private sprayPaint(gun: Gun) {
    //喷漆
    console.log('spray paint.')
  }
}
let ak47 = new AK47Factory().create()
ak47.shoot()

let m4a1 = new M4A1Factory().create()
m4a1.shoot()

// 可以看到Ak47和M4A1在生产出来后的处理不一样，Ak需要涂桐油，M4需要喷漆，
// 用简单工厂就比较难做到，所以就每个产品都弄个工厂来封装各自己的生产过程。
// 另外的好处是当加入其他枪比如沙漠之鹰时，再加一个产品和产品工厂就好了，并不需要改变现有代码，算是做到了遵守开闭原则。
// 缺点也明显，增加一个产品就需要多加两个类，增加了代码复杂性。
export {}
