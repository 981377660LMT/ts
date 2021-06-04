class Animal {
  name: string
  constructor(theName: string) {
    this.name = theName
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`)
  }
  static a = 1
  b = 2
}

class Snake extends Animal {
  constructor(name: string) {
    //super是constructor Animal(theName: string): Animal
    super(name)
  }
  move(distanceInMeters = 5) {
    console.log('Slithering...')
    //super是class Animal
    super.move(distanceInMeters)
    // 通过 "super" 关键字只能访问基类的公共方法和受保护方法。
    // console.log(super.b)
    console.log(Animal.a)
  }
}

let sam = new Snake('Sammy the Python')

sam.move()
