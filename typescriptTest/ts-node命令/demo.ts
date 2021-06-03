interface foo {
  bar: string[]
  [key: number]: string
}

const foo: foo = {
  bar: ['1'],
  1: '2',
}

console.log(foo)
