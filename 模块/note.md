```ts
.d.ts 文件中的顶级声明必须以 "declare" 或 "export" 修饰符开头。

 “内部模块” 现在称做 “命名空间”。 “外部模块” 现在则简称为 “模块”

模块使用模块加载器去导入其它的模块。 在运行时，模块加载器的作用是在执行此模块代码前去查找并执行这个模块的所有依赖。 众所周知的 JavaScript 模块加载器有：作用于 CommonJS 模块的 Node.js 加载器和在 Web 应用里作用于 AMD 模块的 RequireJS 加载器。

TypeScript 与 ECMAScript 2015 一样，任何包含顶级 import 或者 export 的文件都被当成一个模块。 相反地，如果一个文件不带有顶级的 import 或者 export 声明，那么它的内容被视为全局可见的（因此对模块也是可见的）。



导出
export const numberRegexp = /^[0-9]+$/;
export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };
// 导出原先的验证器但做了重命名
export {ZipCodeValidator as RegExpBasedZipCodeValidator} from "./ZipCodeValidator";
export * from "./StringValidator"; // exports 'StringValidator' interface
**默认导出**
default 导出十分便利。 比如，像 jQuery 这样的类库可能有一个默认导出 jQuery 或 $ ，并且我们基本上也会使用同样的名字 jQuery 或 $ 导出 jQuery。
jQuery.d.ts
declare let $: jQuery;
export default $;
app.ts
import $ from "jQuery";
$("button.continue").html( "Next Step..." );
export default "123";

export = 和 import = require()
CommonJS 和 AMD 的环境里都有一个 exports 变量，这个变量包含了一个模块的所有导出内容。
CommonJS 和 AMD 的 exports 都可以被赋值为一个 对象 ，这种情况下其作用就类似于 es6 语法里的默认导出，即 export default 语法了。虽然作用相似，但是 export default 语法并不能兼容 CommonJS 和 AMD 的 exports 。
为了支持 CommonJS 和 AMD 的 exports , TypeScript 提供了 export = 语法。
export = 语法定义一个模块的导出 对象 。 这里的 对象 一词指的是类，接口，命名空间，函数或枚举。
若使用 export = 导出一个模块，则必须使用 TypeScript 的特定语法 import module = require("module") 来导入此模块。


生成模块代码
根据编译时指定的模块目标参数，编译器会生成相应的供 Node.js (CommonJS )，Require.js (AMD )，UMD , SystemJS 或 ECMAScript 2015 native modules (ES6) 模块加载系统使用的代码。 想要了解生成代码中 define ， require 和 register 的意义，请参考相应模块加载器的文档。


编译
对于 Node.js 来说，使用 --module commonjs ； 对于 Require.js 来说，使用 --module amd 。比如：
tsc --module commonjs Test.ts
编译完成后，每个模块会生成一个单独的 .js 文件。 好比使用了 reference 标签，编译器会根据 import 语句编译相应的文件。




.d.ts文件
要想描述非 TypeScript 编写的类库的类型，我们需要声明类库所暴露出的 API。
我们叫它声明因为它不是 “外部程序” 的具体实现。 它们通常是在 .d.ts 文件里定义的。 如果你熟悉 C/C++，你可以把它们当做 .h 文件。 让我们看一些例子。
global.d.ts是全局的而不是一个模块 不含有import 和export



外部模块
在 Node.js 里大部分工作是通过加载一个或多个模块实现的。 我们可以使用顶级的 export 声明来为每个模块都定义一个 .d.ts 文件，但最好还是写在一个大的 .d.ts 文件里。 我们使用与构造一个外部命名空间相似的方法，但是这里使用 module 关键字并且把名字用引号括起来，方便之后 import 。
外部模块简写
假如你不想在使用一个新模块之前花时间去编写声明，你可以采用声明的简写形式以便能够快速使用它。
模块声明通配符
某些模块加载器如 SystemJS和 AMD支持导入非 JavaScript 内容。 它们通常会使用一个前缀或后缀来表示特殊的加载语法。 模块声明通配符可以用来表示这些情况。

UMD 模块
有些模块被设计成兼容多个模块加载器，或者不使用模块加载器（全局变量）。 它们以 UMD (opens new window)模块为代表。 这些库可以通过导入的形式或全局变量的形式访问。

创建模块结构指导
#尽可能地在顶层导出
模块里不要使用命名空间

模块解析
_模块解析_是指编译器在查找导入模块内容时所遵循的流程。 假设有一个导入语句 import { a } from "moduleA" ; 为了去检查任何对 a 的使用，编译器需要准确的知道它表示什么，并且需要**检查它的定义** moduleA 。
编译器会尝试定位表示导入模块的文件。 编译器会遵循以下二种策略之一：Classic 或 Node。 这些策略会告诉编译器到_哪里_去查找 moduleA 。
共有两种可用的模块解析策略：Node 和 Classic。 你可以使用 --moduleResolution 标记来指定使用哪种模块解析策略。 若未指定，那么在使用了 --module AMD | System | ES2015 时的默认值为 Classic，其它情况时则为 Node;
如果上面的解析失败了并且模块名是非相对的（且是在 "moduleA" 的情况下），编译器会尝试定位一个外部模块声明。
最后，如果编译器还是不能解析这个模块，它会记录一个错误。 在这种情况下，错误可能为 error TS2307: Cannot find module 'moduleA'.



相对 vs. 非相对模块导入
相对导入_是以 / ， ./ 或 ../ 开头的。 下面是一些例子：
import Entry from "./components/Entry";
import { DefaultHeaders } from "../constants/http";
import "/mod";
所有其它形式的导入被当作_非相对_的。 下面是一些例子：
import * as $ from "jQuery";
import { Component } from "@angular/core";

相对导入在解析时是相对于导入它的文件，并且_不能_解析为一个外部模块声明。 你应该为你自己写的模块使用相对导入，这样能确保它们在运行时的相对位置。
非相对模块的导入可以相对于 baseUrl 或通过下文会讲到的路径映射来进行解析。 它们还可以被解析成外部模块声明。 使用非相对路径来导入你的外部依赖。



模块解析策略
Classic
这种策略在以前是 TypeScript 默认的解析策略。 现在，它存在的理由主要是为了向后兼容。
相对导入的模块是相对于导入它的文件进行解析的。 因此 /root/src/folder/A.ts 文件里的 import { b } from "./moduleB" 会使用下面的查找流程：
/root/src/folder/moduleB.ts
/root/src/folder/moduleB.d.ts
对于非相对模块的导入，编译器则会从包含导入文件的目录开始依次向上级目录遍历，尝试定位匹配的声明文件。
比如：
有一个对 moduleB 的非相对导入 import { b } from "moduleB" ，它是在 /root/src/folder/A.ts 文件里，会以如下的方式来定位 "moduleB" ：
/root/src/folder/moduleB.ts
/root/src/folder/moduleB.d.ts
/root/src/moduleB.ts
/root/src/moduleB.d.ts
/root/moduleB.ts
/root/moduleB.d.ts
/moduleB.ts
/moduleB.d.ts

Node.js 如何解析模块
为了理解 TypeScript 编译依照的解析步骤，先弄明白 Node.js 模块是非常重要的。 通常，在 Node.js 里导入是通过 require 函数调用进行的。 Node.js 会根据 require 的是相对路径还是非相对路径做出不同的行为。
相对路径很简单。 例如，假设有一个文件路径为 /root/src/moduleA.js ，包含了一个导入 var x = require("./moduleB"); Node.js 以下面的顺序解析这个导入：
1. 检查 /root/src/moduleB.js 文件是否存在。
2. 检查 /root/src/moduleB 目录是否包含一个 package.json 文件，且 package.json 文件指定了一个 "main" 模块。 在我们的例子里，如果 Node.js 发现文件 /root/src/moduleB/package.json 包含了 { "main": "lib/mainModule.js" } ，那么 Node.js 会引用 /root/src/moduleB/lib/mainModule.js 。
3. 检查 /root/src/moduleB 目录是否包含一个 index.js 文件。 这个文件会被隐式地当作那个文件夹下的 "main" 模块

绝对路径
Node 会在一个特殊的文件夹 node_modules 里查找你的模块。 node_modules 可能与当前文件在同一级目录下，或者在上层目录里。 Node 会向上级录遍历，查找每个 node_modules 直到它找到要加载的模块。
还是用上面例子，但假设 /root/src/moduleA.js 里使用的是非相对路径导入 var x = require("moduleB"); 。 Node 则会以下面的顺序去解析 moduleB ，直到有一个匹配上。
/root/src/node_modules/moduleB.js
/root/src/node_modules/moduleB/package.json (如果指定了 "main" 属性)
/root/src/node_modules/moduleB/index.js
/root/node_modules/moduleB.js
/root/node_modules/moduleB/package.json (如果指定了 "main" 属性)
/root/node_modules/moduleB/index.js
/node_modules/moduleB.js
/node_modules/moduleB/package.json (如果指定了 "main" 属性)
/node_modules/moduleB/index.js
注意 Node.js 在步骤（4）和（7）会向上跳一级目录。

指定moduleResolution为Node的TypeScript 如何解析模块
TypeScript 在 Node 解析逻辑基础上增加了 TypeScript 源文件的扩展名（ .ts ， .tsx 和 .d.ts ）。 同时，TypeScript 在 package.json 里使用字段 "types" 来表示类似 "main" 的意义 - 编译器会使用它来找到要使用的"main" 定义文件。
比如，有一个导入语句 import { b } from "./moduleB" 在 /root/src/moduleA.ts 里，会以下面的流程来定位 "./moduleB" ：
/root/src/moduleB.ts
/root/src/moduleB.tsx
/root/src/moduleB.d.ts
/root/src/moduleB/package.json (如果指定了 "types" 属性)
/root/src/moduleB/index.ts
/root/src/moduleB/index.tsx
/root/src/moduleB/index.d.ts

非相对的导入会遵循 Node.js 的解析逻辑，首先查找文件，然后是合适的文件夹。 因此 /root/src/moduleA.ts 文件里的 import { b } from "moduleB" 会以下面的查找顺序解析：

/root/src/node_modules/moduleB.ts
/root/src/node_modules/moduleB.tsx
/root/src/node_modules/moduleB.d.ts
/root/src/node_modules/moduleB/package.json (如果指定了 "types" 属性)
/root/src/node_modules/@types/moduleB.d.ts
/root/src/node_modules/moduleB/index.ts
/root/src/node_modules/moduleB/index.tsx
/root/src/node_modules/moduleB/index.d.ts
/root/node_modules/moduleB.ts
/root/node_modules/moduleB.tsx
/root/node_modules/moduleB.d.ts
/root/node_modules/moduleB/package.json (如果指定了 "types" 属性)
/root/node_modules/@types/moduleB.d.ts
/root/node_modules/moduleB/index.ts
/root/node_modules/moduleB/index.tsx
/root/node_modules/moduleB/index.d.ts
/node_modules/moduleB.ts
/node_modules/moduleB.tsx
/node_modules/moduleB.d.ts
/node_modules/moduleB/package.json (如果指定了 "types" 属性)
/node_modules/@types/moduleB.d.ts
/node_modules/moduleB/index.ts
/node_modules/moduleB/index.tsx
/node_modules/moduleB/index.d.ts

告诉编译器到哪里去查找模块
路径映射
加载器使用映射配置来将模块名映射到运行时的文件
{
  "compilerOptions": {
    "baseUrl": ".", // This must be specified if "paths" is.
    "paths": {
      "jquery": ["node_modules/jquery/dist/jquery"] // 此处映射是相对于"baseUrl"
    }
  }
}
请注意 "paths" 是相对于 "baseUrl" 进行解析。 如果 "baseUrl" 被设置成了除 "." 外的其它值，比如 tsconfig.json 所在的目录，那么映射必须要做相应的改变。 如果你在上例中设置了 "baseUrl": "./src" ，那么 jquery 应该映射到 "../node_modules/jquery/dist/jquery" 。

多文件中的命名空间
现在，我们把 Validation 命名空间分割成多个文件。 尽管是不同的文件，它们仍是同一个命名空间，并且在使用的时候就如同它们在一个文件中定义的一样。 因为不同文件之间存在依赖关系，所以我们加入了引用标签来告诉编译器文件之间的关联。 我们的测试代码保持不变。

另一种简化命名空间操作的方法是使用import q = x.y.z 给常用的对象起一个短的别名

使用其它的 JavaScript 库
为了描述不是用 TypeScript 编写的类库的类型，我们需要声明类库导出的 API。 由于大部分程序库只提供少数的顶级对象，命名空间是用来表示它们的一个好办法。


一个常见的错误是使用 /// <reference> 引用非模块文件， import引用模块文件
编译器首先尝试去查找相应路径下的 .ts ， .tsx 再或者 .d.ts 。 如果这些文件都找不到，编译器会查找_外部模块声明_。 回想一下，它们是在 .d.ts 文件里声明的。
myModules.d.ts  没有export或者import,所以不是(ESModule)模块
// In a .d.ts file or .ts file that is not a module:
declare module "SomeModule" {
    export function fn(): string;
}

myOtherModule.ts  是模块
/// <reference path="myModules.d.ts" />
import * as m from "SomeModule";
这就是一些 TypeScript 例子中引用 node.d.ts 的方法。



不必要的命名空间:不应该对模块使用命名空间
TypeScript 里模块的一个特点是不同的模块永远也不会在相同的作用域内使用相同的名字。 因为使用模块的人会为它们命名，所以完全没有必要把导出的符号包裹在一个命名空间里。
使用命名空间是为了提供逻辑分组和避免命名冲突。 模块文件本身已经是一个逻辑分组，并且它的名字是由导入这个模块的代码指定，所以没有必要为导出的对象增加额外的模块层。
```
