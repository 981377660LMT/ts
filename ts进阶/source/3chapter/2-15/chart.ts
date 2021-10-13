interface ISquare {
  width: number
  height: number
}

class Square implements ISquare {
  width: number
  height: number
  constructor(width: number, height: number)
  constructor(value: ISquare)
  constructor(valueOrWidth: number | ISquare, height?: number) {
    if (typeof valueOrWidth === 'object') {
      this.height = valueOrWidth.height
      this.width = valueOrWidth.width
    } else {
      this.width = valueOrWidth
      this.height = height
    }
  }
}

const square1 = new Square(40, 50)
const square2 = new Square({ width: 40, height: 50 })
