// 享元模式就是运行共享技术有效地支持大量细粒度的对象，避免大量拥有相同内容的小类的开销（如耗费内存），使大家共享一个类。在享元模式中有两个重要的概念，即内部状态和外部状态：

// 内部状态：在享元对象内部不随外界环境改变而改变的共享部分。
// 外部状态：随着环境的改变而改变，不能够共享的状态就是外部状态。
// 由于享元模式区分了内部状态和外部状态，所以我们可以通过设置不同的外部状态使得相同的对象可以具备一些不同的特性，而内部状态设置为相同部分。
// 享元模式能有效减少在画布上渲染数百万个树状对象时所需的内存。
// 享元模式只有一个目的： 将内存消耗最小化。 如果你的程序没有遇到内存容量不足的问题， 则可以暂时忽略该模式。

// 享元模式包含以下角色：

// Client：调用 FlyweightFactory 获取享元对象。
// FlyweightFactory：
// 创建和管理享元对象；
// 当请求某个享元对象不存在时，它会创建一个新的享元对象；
// 新创建的享元对象会被存储起来，用于下次请求。
// Flyweight：维护要在应用程序之间共享的固有数据。

// 未使用享元模式前，我们写如下代码：

class Iphone11 {
  constructor(model: string, screen: number, memory: number, sn: number) {}
}

const phones = []
for (let i = 0; i < 10000; i++) {
  let memory = i % 2 == 0 ? 128 : 256
  phones.push(new Iphone11('iPhone11', 6.1, memory, i))
}
//////////////////////////////////////////////////////////
// 当存在大量相似对象的程序，我们就可以考虑用享元模式去优化它，我们分析出大部分的 iPhone11 的型号、屏幕、内存都是一样的，那么这部分数据就可以共用，这就是享元模式中的内在数据，因此定义 iPhone11 对应的享元类如下：
class IphoneFlyweight {
  constructor(model: string, screen: number, memory: number) {}
}
// 我们还需要一个享元工厂来维护这些数据：
// 单例模式
// 在这个工厂中，我们定义了一个对象来保存享元对象，并提供一个方法根据参数来获取享元对象，如果 phonesMap 对象中有则直接返回，没有则创建一个返回。
class FlyweightFactory {
  private phonesMap: { [s: string]: IphoneFlyweight } = {}

  public get(model: string, screen: number, memory: number): IphoneFlyweight {
    const key = model + screen + memory
    if (!this.phonesMap[key]) {
      this.phonesMap[key] = new IphoneFlyweight(model, screen, memory)
    }
    return this.phonesMap[key]
  }
}
// 定义 Iphone 类
class Iphone {
  constructor(flyweight: IphoneFlyweight, sn: number) {}
}
// 定义 IphoneFactory 类：关键在这里
class IphoneFactory {
  private static flyweightFactory: FlyweightFactory = new FlyweightFactory()

  public getIphone(model: string, screen: number, memory: number, sn: number) {
    const flyweight: IphoneFlyweight = IphoneFactory.flyweightFactory.get(model, screen, memory)
    return new Iphone(flyweight, sn)
  }
}

function createBulk(): void {
  const iphoneFactory = new IphoneFactory()
  const phones = []
  for (let i = 0; i < 10000; i++) {
    let memory = i % 2 == 0 ? 128 : 256
    phones.push(iphoneFactory.getIphone('iPhone11', 6.1, memory, i))
  }
  console.log('Already created 10000 iPhone11')
}

createBulk()
export {}

// 享元模式（Flyweight Pattern）主要用于减少创建对象的数量，以减少内存占用和提高性能。
