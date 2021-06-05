// ThisParameterType<Type>
// 从函数类型中提取 this 参数的类型。 若函数类型不包含 this 参数，则返回 unknown 类型。
function toHex(this: Number) {
  return this.toString(16)
}
function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n)
}

// OmitThisParameter<Type>
// 从 Type 类型中剔除 this 参数。 若未声明 this 参数，则结果类型为 Type 。
const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5)
console.log(fiveToHex())

// Compile with --noImplicitThis
// 怎么使用ThisType???
type ObjectDescriptor<D, M> = {
  data?: D
  methods?: M & ThisType<D & M> // Type of 'this' in methods is D & M
}

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {}
  let methods: object = desc.methods || {}
  return { ...data, ...methods } as D & M
}

let obj_ = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx // Strongly typed this
      this.y += dy // Strongly typed this
    },
  },
})

obj_.x = 10
obj_.y = 20
obj_.moveBy(5, 5)

// 在 lib.d.ts 里， ThisType<T> 标识接口是个简单的空接口声明。除了在被识别为对象字面量的上下文类型之外，这个接口与一般的空接口没有什么不同。
