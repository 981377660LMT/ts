// 声明接口和类型

interface Warrior {
  fight(): string
  sneak(): string
}

interface Weapon {
  hit(): string
}

interface ThrowableWeapon {
  throw(): string
}

const TYPES = {
  Warrior: Symbol.for('Warrior'),
  Weapon: Symbol.for('Weapon'),
  ThrowableWeapon: Symbol.for('ThrowableWeapon'),
}

export { TYPES }
export { Warrior, Weapon, ThrowableWeapon }
