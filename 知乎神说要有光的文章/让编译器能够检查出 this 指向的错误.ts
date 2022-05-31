class Dong {
  name: string

  constructor(name: string) {
    this.name = name
  }

  // 在方法声明时指定 this 的类型很关键
  hello(this: Dong) {
    console.log(this.name)
  }
}

const dong = new Dong('dong')
dong.hello()
dong.hello.call({ xxx: 1 })
type GenThis = ThisType<typeof dong.hello>
type GetThis = ThisParameterType<typeof dong.hello>

export {}
