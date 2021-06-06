// 简单工厂模式 Simple Factory
// 特点：把同类型产品对象的创建集中到一起，通过工厂来创建，添加新产品时只需加到工厂里即可，也就是把变化封装起来，同时还可以隐藏产品细节。
// 用处：要new多个同一类型对象时可以考虑使用简单工厂。
// 注意：对象需要继承自同一个接口。
enum GunType {
  AK,
  M4A1,
}

interface Shootable {
  shoot(): void
}

abstract class Gun implements Shootable {
  // 抽象产品 - 枪
  abstract shoot(): void
}

class AK extends Gun {
  //具体产品 - AK47
  shoot() {
    console.log('ak47')
  }
}

class M4A1 extends Gun {
  //具体产品 - M4A1
  shoot() {
    console.log('m4a1 shoot.')
  }
}

class GunFactory {
  static createGun(type: GunType) {
    switch (type) {
      case GunType.AK:
        return new AK()
      case GunType.M4A1:
        return new M4A1()
      default:
        throw Error('not support this gun yet')
    }
  }
}

GunFactory.createGun(GunType.AK).shoot()
// GunFactory工厂就是根据类型来创建不同的产品，使用的时候只需要引入这个工厂和接口即可。
// 这样就把变化封装到了工厂中，如果以后要支持狙击枪，只需要加个实现Gun接口的Sniper类就可以了。

export {}
