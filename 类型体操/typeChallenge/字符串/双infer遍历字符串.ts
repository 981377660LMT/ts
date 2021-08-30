// 每次infer先只取第一个  infer优先提取非解构部分
// 遍历字符串
type Test1<Word> = Word extends `${infer L}${infer R}` ? L : never
type Test2<Word> = Word extends `${infer L}${infer R}` ? R : never

type Foo1 = Test1<'asd'>
type Foo2 = Test2<'asd'>
type Foo3 = Test2<'a'>
type Foo4 = Test1<'a'>

export {}
