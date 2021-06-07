enum Types {
  type1 = '类型一',
  type2 = '类型二',
  type3 = '类型三',
}

console.log(Types)
type a = Types extends Object ? '1' : '2'
class ArrayAdapterOfEnum {
  private anyEnum!: { [key: string]: any }
  private index!: number
  private values!: Array<any>
  constructor(anyEnum?: object) {
    this.setEnum(anyEnum)
  }
  [Symbol.iterator]() {
    return {
      next: () => {
        return {
          done: this.index >= this.values.length,
          value: this.values[this.index++],
        }
      },
    }
  }
  setEnum(anyEnum?: Object) {
    this.anyEnum = anyEnum || {}
    this.values = []
    for (let key in this.anyEnum) {
      this.values.push(this.anyEnum[key])
    }
    this.index = 0
    return this
  }
}
let arrayAdapterOfEnum = new ArrayAdapterOfEnum()

for (let item of arrayAdapterOfEnum.setEnum(Types)) {
  console.log(item)
}
