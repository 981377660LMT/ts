1. 删除
   使用 this.foo = null 而不是 delete
   在现代的 JavaScript 引擎中，`改变一个对象属性的数量比重新分配值慢得多`。应该避免删除关键字，除非有必要从一个对象的迭代的关键字列表删除一个属性，或改变 if (key in obj) 结果
2. eval()函数只用于反序列化（如评估 RPC 响应）。
3. 为长类型的名称提供别名提高可读性
4. JSDoc 标签参考
5. 命名规范
   命名法 分类
   帕斯卡命名法（ UpperCamelCase ） 类、接口、类型、枚举、装饰器、类型参数
   驼峰式命名法（ lowerCamelCase ） 变量、参数、函数、方法、属性、模块别名
   全大写下划线命名法（ CONSTANT_CASE） 全局常量、枚举值
   私有成员命名法（ #ident ） 不允许使用
6. 美元符号 $
   一般情况下，标识符不应使用 $，除非为了与第三方框架的命名规范保持一致。关于 $ 的使用，可参见 命名风格 一节对 `Observable` 类型的说明。对于 Observable 类型的值，通常的惯例是使用 $ 前缀将其与一般类型的值进行区分，使之不致混淆。
7. `_` 前缀与后缀
   标识符禁止使用下划线 `_` 作为前缀或后缀。
   如果需要从数组或元组中取出某个或某几个特定的元素的话，可以在解构语句中插入额外的逗号，忽略掉不需要的元素：

```JS
const [a, , b] = [1, 5, 10];  // a <- 1, b <- 10
```

8. 用 JSDoc 还是 注释？
   对于文档，也就是用户应当阅读的注释，使用 `/** JSDoc */` 。
   对于实现说明，也就是只和代码本身的实现细节有关的注释，使用 `// 行注释` 。
   JSDoc 注释能够为工具（例如编辑器或文档生成器）所识别，而普通注释只能供人阅读。
9. 省略对于 TypeScript 而言多余的注释
10. 对所有导出的顶层模块进行注释
    些注释应当言之有物，切忌仅仅将属性名或参数名重抄一遍。如果代码的审核人认为`某个属性或方法的作用不能从它的名字上一目了然地看出来的话`，这些属性和方法同样应当使用 `/** JSDoc */` 注释添加说明文档，无论它们是否被导出，是公开还是私有的。
11. 除了在构造函数中声明公开（ public ）且非只读（ readonly ）的参数属性之外，不要使用 `public 修饰符`。
12. 没有必要声明一个空的构造函数
13. 没有必要声明一个仅仅调用基类构造函数的构造函数
14. 如果某个成员并非参数属性，应当在声明时就对其进行初始化，这样有时可以完全省略掉构造函数。
15. 在 TypeScript 中，不要实例化原始类型的封装类，例如 String 、 Boolean 、 Number 等。封装类有许多不合直觉的行为，例如 `new Boolean(false) 在布尔表达式中会被求值为 true。`
16. 禁止使用 Array() 构造函数
    应当使用方括号对数组进行初始化，或者使用 from 构造一个具有确定长度的数组：

```JS

// 生成 [0, 0, 0, 0, 0]
Array.from<number>({length: 5}).fill(0);
```

17. 不建议通过字符串连接操作将类型强制转换为 string
18. 同样地，代码中也禁止使用 parseInt 或 parseFloat 进行转换，除非用于解析表示非十进制数字的字符串。`因为这两个函数都会忽略字符串中的后缀`，这有可能在无意间掩盖了一部分原本会发生错误的情形
19. 对于需要解析非十进制数字的情况，在调用 parseInt 进行解析之前必须检查输入是否合法。

```JS
if (!/^[a-fA-F0-9]+$/.test(someString)) throw new Error(...);
// 需要解析 16 进制数。
// tslint:disable-next-line:ban
const n = parseInt(someString, 16);  // 只允许在非十进制的情况下使用 parseInt。
```

`应当使用 Number() 和 Math.floor 或者 Math.trunc （如果支持的话）解析整数。`

20. 在实例化异常对象时，`必须使用 new Error() 语法而非调用 Error() 函数`。虽然这两种方法都能够创建一个异常实例，但是使用 new 能够与代码中其它的对象实例化在形式上保持更好的一致性。
21. 禁止展开原始类型，包括 null 和 undefined 。
    在使用展开运算符时，被展开的值必须与被创建的值相匹配。也就是说，`在创建对象时只能展开对象，在创建数组时只能展开可迭代类型。`
22. 多行控制流语句必须使用大括号。
    这条规则的例外时，能够写在同一行的 if 语句可以省略大括号。

```JS
// 可以这样做！
if (x) x.doFoo();
```

23. 不要使用 @ts-ignore
24. 除非有明显或确切的理由，否则 不应 使用类型断言和非空断言。
25. **使用类型标记（ : Foo ）而非类型断言（ as Foo ）标明对象字面量的类型**

```JS
// 应当这样做！
const foo: Foo = {
    a: 123,
    b: 'abc',
}

// 不要这样做！
const badFoo = {
    a: 123,
    b: 'abc',
}

// 不要这样做！
const badFoo = {
    a: 123,
    b: 'abc',
} as Foo
```

26. 导入模块对象时应当直接访问对象上的属性，而不要传递对象本身的引用，以保证模块能够被分析和优化

```JS
// 应当这样做！
import {method1, method2} from 'utils';
class A {
    readonly utils = {method1, method2};
}

// 不要这样做！
import * as utils from 'utils';
class A {
    readonly utils = utils;
}
```

27. 对于枚举类型，`必须使用 enum 关键字，但不要使用 const enum` 。TypeScript 的枚举类型本身就是不可变的， const enum 的写法是另一种独立的语言特性，其目的是让枚举对 JavaScript 程序员透明。
28. 通常情况下，应当避免使用装饰器
    这是由于装饰器是一个实验性功能，仍然处于 TC39 委员会的提案阶段，且目前存在已知的无法被修复的 Bug。
29. 任何时候都应当使用 ES6 的导入语法。
30. 不要使用默认导出，这样能保证所有的导入语句都遵循统一的范式：
31. 不允许使用 export let
32. 如果确实需要允许外部代码对可变值进行访问，应当提供一个显式 getter。

```JS
// 不要这样做！
export let foo = 3;
// 在纯 ES6 环境中，变量 foo 是一个可变值，导入了 foo 的代码会观察到它的值在一秒钟之后发生了改变。
// 在 TypeScript 中，如果 foo 被另一个文件重新导出了，导入该文件的代码则不会观察到变化。
window.setTimeout(() => {
    foo = 4;
}, 1000 /* ms */);



// 应当这样做！
let foo = 3;
window.setTimeout(() => {
    foo = 4;
}, 1000 /* ms */);
// 使用显式的取值器对可变导出进行访问。
export function getFoo() { return foo; };
```

33. 不要为了实现命名空间创建含有静态方法或属性的容器类。应当将这些方法和属性设为单独导出的常数和函数。
34. 在 ES6 和 TypeScript 中，导入语句共有四种变体：
    模块 import `*` as foo from '...'; TypeScript 导入方式
    解构 import {SomeThing} from '...'; TypeScript 导入方式
    默认 import SomeThing from '...'; 只用于外部代码的特殊需求
    副作用 import '...'; 只用于加载某些库的副作用（例如自定义元素）

```JS
// 应当这样做！从这两种变体中选择较合适的一种（见下文）。
import * as ng from '@angular/core';
import {Foo} from './foo';

// 只在有需要时使用默认导入。
import Button from 'Button';

// 有时导入某些库是为了其代码执行时的副作用。
import 'jasmine';
import '@polymer/paper-button';
```

35. 选择模块导入还是解构导入
    在从一个大型 API 中导入多个不同的符号时，模块导入语句尤其有用。 (path.resolve/path.join)
    解构导入语句则为每一个被导入的符号提供一个局部的名称，这样在使用被导入的符号时，代码可以更简洁。`对那些十分常用的符号`，例如 Jasmine 的 describe 和 it 来说，这一点尤其有用。(React 的 hooks)

```JS
// 不要这样做！无意义地使用命名空间中的名称使得导入语句过于冗长。
import {TableViewItem, TableViewHeader, TableViewRow, TableViewModel,
TableViewRenderer} from './tableview';
let item: TableViewItem = ...;

// 应当这样做！使用模块作为命名空间。
import * as tableview from './tableview';
let item: tableview.Item = ...;


// 这样做更好！为这几个常用的函数提供局部变量名。
import {describe, it, expect} from './testing';

describe('foo', () => {
it('bar', () => {
    expect(...);
    expect(...);
});
});
...
```

36. 不要使用 import type ... from 或者 export type ... from 。
37. 重命名导入
    在代码中，应当通过使用模块导入或重命名导出解决命名冲突
    被导入符号的名称不能清晰地描述其自身，需要通过重命名提高代码的可读性，如`将 RxJS 的 from 函数重命名为 observableFrom 。`
38. Null 还是 Undefined
    许多 JavaScript API 使用 undefined （例如 Map.get ），然而 DOM 和 Google API 中则更多地使用 null （例如 Element.getAttribute ），因此，`对于 null 和 undefined 的选择取决于当前的上下文。`
39. 可选参数 还是 undefined 类型？
    应当`使用可选字段（对于类或者接口）和可选参数`而非联合 |undefined 类型。
    对于类，应当尽可能避免使用可选字段，尽可能初始化每一个字段。

```JS
class MyClass {
    field = '';
}
```

40. 在 TypeScript 中，应当为键提供一个有意义的标签名

```JS
// 不要这样做！
const users: {[key: string]: number} = ...;

// 应当这样做！
const users: {[userName: string]: number} = ...;
```

41. 应当使用元组类型代替常见的 Pair 类型的写法：

```JS
// 应当这样做！
function splitInHalf(input: string): [string, string] {
    // ...
    return [x, y];
}

// 这样使用:
const [leftHalf, rightHalf] = splitInHalf('my string');
```
