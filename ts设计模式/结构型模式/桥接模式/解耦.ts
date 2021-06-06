// 桥接模式的主要目的，是将抽象与实现解耦，使得二者可以独立地进行变化，以应对不断更细的需求。
abstract class Color {
  abstract color: string
  abstract draw(): void
}

abstract class Car {
  abstract color: Color
  abstract setColor(color: Color): void
}

class Red extends Color {
  color!: string
  constructor() {
    super()
  }

  draw() {
    this.color = 'red'
  }
}

class Van extends Car {
  color!: Color
  constructor() {
    super()
  }
  setColor(color: Color) {
    this.color = color
  }
}

class PaintingVanBridge {
  van: Car
  red: Color
  constructor() {
    this.red = new Red()
    this.red.draw()
    this.van = new Van()
    this.van.setColor(this.red)
  }
}

export {}
