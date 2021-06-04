function test(): void {
  return
}

// null与undefined是所有类型的子类型
// 初始化变量时
let a: boolean | null = null
let b: number | undefined = undefined

// never表示永远不存在值得类型
// 返回never的函数必须存在无法到达的终点:无限循环，抛出异常
function err(message: string): never {
  throw new Error(message)
}

//declare用来注解函数
//object表示非原始数据类型
declare function create(o: object | null): void

create([])
create(() => {})

// 什么时候需要类型注解？(应该利用类型推断，少一些不必要的类型注解)
// 例如：能正确类型推断，不需要类型注解(鼠标在变量名上悬浮)
let n = 3

// 函数参数需要类型注解(推断不出)
function foo(a: string): string {
  return a.split('').reverse().join('')
}
