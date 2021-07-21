// 将类型看成值，然后对类型进行编程，这就是泛型的基本思想

type P = [number, string, boolean]
type Q = Date
type R = [Q, ...P]

type Pen<P = {}> = {
  name: P
}
let a: Pen<string>

// 注意:
// type 钢笔 = Pen
// let b: 钢笔<string> // 类型“钢笔”不是泛型类型。

type 钢笔<钢笔类型> = Pen<钢笔类型>
let c: 钢笔<string>

// tsx中可以使用<>声明泛型
// TS 发明这个语法的时候，还没想过有 JSX 这种东西。后来 TS 团队在 TypeScript 2.9 版本修复了这个问题。
// 也就是说现在你可以直接在 TS 中使用带有泛型参数的 JSX 啦（比如上面的代码）。

// extends泛型类型约束是非常常见的操作，大家一定要掌握。
export {}
