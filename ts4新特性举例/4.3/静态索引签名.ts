class Foo {
  hello = 'hello'
  static world = 1234;

  // 索引签名:
  [propName: string]: string | number | undefined
  // 静态索引签名
  static [propName: string]: string | number | undefined
}

let instance = new Foo()

// ok
instance['whatever'] = 42
// ok
Foo['whatever'] = 42

export {}
