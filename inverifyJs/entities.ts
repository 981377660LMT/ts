// 使用 @injectable 和 @inject 装饰器声明依赖

import { inject, injectable } from 'inversify'
import { ThrowableWeapon, TYPES, Warrior, Weapon } from './types'

@injectable()
class Katana implements Weapon {
  public hit() {
    return 'cut!'
  }
}

@injectable()
class Shuriken implements ThrowableWeapon {
  // 试一下循环依赖
  // Error: Circular dependency found: Symbol(Warrior) --> Symbol(ThrowableWeapon) --> Symbol(Warrior)
  // constructor(@inject(TYPES.Warrior) private ninja: Ninja) {}
  public throw() {
    return 'hit!'
  }
}

@injectable()
class Ninja implements Warrior {
  constructor(
    @inject(TYPES.Weapon) private katana: Weapon,
    @inject(TYPES.ThrowableWeapon) private shuriken: Shuriken
  ) {}

  fight() {
    return this.katana.hit()
  }

  sneak() {
    return this.shuriken.throw()
  }
}

export { Ninja, Katana, Shuriken }
