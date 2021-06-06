class Car {
  name!: string
  color!: string
  changeColor(color: string) {
    this.color = color
  }
  changeName(name: string) {
    this.name = name
  }
}

class CarFactory {
  static car: Car
  static getCar(): Car {
    if (CarFactory.car === null) {
      CarFactory.car = new Car()
    }
    return CarFactory.car
  }
}

CarFactory.getCar().changeColor('red')

// 享元模式避免重新创建对象，其实只要有缓存对象的意思，并且共用一个对象实例，就是享元模式。

export {}
