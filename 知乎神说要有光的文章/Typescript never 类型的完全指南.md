<!-- Typescript never 类型的完全指南 -->

- 就像在数学中我们使用零来表示没有的数量一样，我们需要一个类型来表示类型系统中的不可能。
  一个不能有任何值的空类型来表示以下内容：

泛型和函数中不允许的参数。
不兼容类型的交集。
空的联合类型（啥都没有的联合类型）。

- 如何使用 never 类型

  - 限制函数参数
    由于我们永远无法赋值给一个 never 类型，因此我们可以使用它来对各种用例的函数施加限制。
  - 确保 switch 和 if-else 的完整匹配
    如果一个函数只能接受一个 never 类型的参数，那么该函数则无法用任何非 never 类型的值调用（TypeScript 编译器可能有一堆“是故意的，还是不小心”的问题，但是别管它先）：

    ```ts
    function fn(input: never) {}

    // 它只能传 `never`
    declare let myNever: never
    fn(myNever) // 新技能 ✅
    ```

  - 部分禁止结构类型
    假设我们有一个函数接受类型为 VariantA 或 VariantB 的参数。但是，用户不能传包含两种类型的所有属性的类型，即只能传两种类型的子类型。

    ```ts
    type VariantA = {
      a: string
    }

    type VariantB = {
      b: number
    }

    declare function fn(arg: VariantA | VariantB): void

    const input = { a: 'foo', b: 123 }
    fn(input) // TypeScript 允许，但不符合我们的预期

    // 通过使用 never，我们可以部分禁用并防止用户传递包含这两个属性的对象值：
    type VariantA = {
      a: string
      b?: never
    }

    type VariantB = {
      b: number
      a?: never
    }

    declare function fn(arg: VariantA | VariantB): void

    const input = { a: 'foo', b: 123 }
    fn(input) // ❌ Types of property 'a' are incompatible
    ```

  - 防止意外的 API 使用

  ```ts
  declare class ReadOnlyCache<R> extends MyCache<never, R> {}
  // 现在泛型 T 变成了 `never`（put 传入的参数就是 T）

  const readonlyCache = new ReadOnlyCache<Read>()
  readonlyCache.put(data) // ❌ Argument of type 'Data' is not assignable to parameter of type 'never'.
  ```

  - 表示理论上无法到达的分支

  ```ts
  type A = 'foo'
  type B = A extends infer C
    ? C extends 'foo'
      ? true
      : false // 仅在这个（）表达式里, C 是一个局部 A（而不是直接使用了全局的 A）
    : never // 不应该走到这里，但是我们不得不用 never 占位
  ```
