function Foo(this: { a: string }) {}
function Bar() {}

type A = MyThisParameterType<typeof Foo> // {a: string}
type B = MyThisParameterType<typeof Bar> // unknown

type MyThisParameterType<T> = T extends (this: infer T, ...args: any[]) => any ? T : never
