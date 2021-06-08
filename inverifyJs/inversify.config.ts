import 'reflect-metadata'

import { Container } from 'inversify'
import { Katana, Ninja, Shuriken } from './entities'
import { ThrowableWeapon, TYPES, Warrior, Weapon } from './types'

// 推荐在命名为 inversify.config.ts 的文件中创建和配置容器。
// Container做了什么事？
const myContainer = new Container()
myContainer.bind<Warrior>(TYPES.Warrior).to(Ninja)
myContainer.bind<Weapon>(TYPES.Weapon).to(Katana)
myContainer.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken)

export { myContainer }
