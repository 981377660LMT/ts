// 抽象工厂模式 Abstract Factory
// 特点：同样隐藏了具体产品的生产，不过生产的是多种类产品。
// 用处：当需要生产的是一个产品族，并且产品之间或多或少有关联时可以考虑抽象工厂方法。
// 注意：和工厂方法的区别，工厂方法是一个产品， 而抽象工厂是产品族，线和面的区别。
// 继续用枪，外加子弹
interface Shootable {
  shoot(): void
}

abstract class Bullet {
  // 抽象子弹
  abstract name: string
}

class AkBullet extends Bullet {
  // AK 子弹
  name: string = 'ak bullet'
}

class M4Bullet extends Bullet {
  // m4a1 子弹
  name: string = 'm4a1 bullet'
}

abstract class Gun implements Shootable {
  // 抽象产品 - 枪
  protected bullet!: Bullet

  addBullet(bullet: Bullet) {
    this.bullet = bullet
    return this
  }

  abstract shoot(): void
}

class AK47 extends Gun {
  //具体产品 - AK47

  shoot() {
    console.log(`ak47 shoot with ${this.bullet.name}.`)
  }
}

class M4A1 extends Gun {
  //具体产品 - M4A1

  shoot() {
    console.log(`m4a1 shoot with ${this.bullet.name}.`)
  }
}

abstract class ArmFactory {
  //抽象军工厂
  abstract createGun(): Gun
  abstract createBullet(): Bullet
}

class AK47Factory extends ArmFactory {
  createGun() {
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

  createBullet(): Bullet {
    return new AkBullet()
  }
}

class M4A1Factory extends ArmFactory {
  //M4A1工厂
  createGun() {
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

  createBullet(): Bullet {
    return new M4Bullet()
  }
}

//使用
function shoot(gun: Gun, bullet: Bullet) {
  // 使用生产的枪和子弹
  gun.addBullet(bullet)
  gun.shoot()
}

let akFactory = new AK47Factory()
shoot(akFactory.createGun(), akFactory.createBullet())

// 工厂除了生产枪外还生产子弹，子弹和枪算是一个产品族，使用者接触到的只有抽象工厂和抽象产品，隐藏了具体实现细节。
// 在大的框架下面有很多小项目时用抽象工厂配合如动态对象生成之类的技术就可以很容易实现灵活的架构。
