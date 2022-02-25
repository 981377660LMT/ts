声明文件.d.ts 里只能写 declare 和 export

```ts
组织声明文件的方式取决于代码库是如何被使用的

识别代码库的类型
在为代码库编写声明文件时，你需要问自己以下几个问题。
如何获取代码库？
比如，是否只能够从 npm 或 CDN 获取。
如何导入代码库？
它是否添加了某个全局对象？它是否使用了 require 或 import / export 语句？


#模块化代码库
几乎所有的 Node.js 代码库都属于这一类。
模块化代码库至少会包含以下代表性条目之一：
无条件的调用 require 或 define
像 import * as a from 'b'; 或 export c; 这样的声明
赋值给 exports 或 module.exports
它们极少包含：
对 window 或 global 的赋值

#全局代码库
你通常能够在文档里看到如何在 HTML 的 script 标签里引用代码库：
<script src="http://a.great.cdn.for/someLib.js"></script>
目前，大多数流行的全局代码库都以 UMD 代码库发布。 UMD 代码库与全局代码库很难通过文档来识别。 在编写全局代码库的声明文件之前，确保代码库不是 UMD 代码库。
在阅读全局代码库的代码时，你会看到：
顶层的 var 语句或 function 声明
一个或多个 window.someName 赋值语句
假设 DOM 相关的原始值 document 或 window 存在
你不会看到：
检查或使用了模块加载器，如 require 或 define
CommonJS/Node.js 风格的导入语句，如 var fs = require("fs");
define(...) 调用
描述 require 或导入代码库的文档
由于将全局代码库转换为 UMD 代码库十分容易，因此很少有代码库仍然使用全局代码库风格。


#UMD(一般的做法)
一个 UMD 模块既可以用作 ES 模块（使用导入语句），也可以用作全局变量（在缺少模块加载器的环境中使用）。
许多流行的代码库，如 Moment.js (opens new window)，都是使用这模式发布的。
例如， Node.js 中或使用了 RequireJS 时，你可以这样使用：
import moment = require('moment');
console.log(moment.format());
在纯浏览器环境中，你可以这样使用：
console.log(moment.format());
UMD 模块 (opens new window)会检查运行环境中是否存在模块加载器。 这是一种常见模式，示例如下：
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["libName"], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(require("libName"));
    } else {
        root.returnExports = factory(root.libName);
    }
}(this, function (b) {
returnExports表示浏览器环境的全局变量名
如果你看到代码库中存在类如 typeof define ， typeof window 或 typeof module 的检测代码，尤其是在文件的顶端，那么它大概率是 UMD 代码库。
大多数流行的代码库均提供了 UMD 格式的包。 例如，jQuery (opens new window)，Moment.js (opens new window)和 lodash (opens new window)等。


#全局插件
一个全局插件是全局代码，它们会改变全局对象的结构。 对于全局修改的模块，在运行时存在冲突的可能。
比如，一些库往 Array.prototype 或 String.prototype 里添加新的方法。


#全局修改的模块
当一个全局修改的模块被导入的时候，它们会改变全局作用域里的值。 比如，存在一些库它们添加新的成员到 String.prototype 当导入它们的时候。 这种模式很危险，因为可能造成运行时的冲突， 但是我们仍然可以为它们书写声明文件。



利用依赖
如果你的代码库依赖于某个全局代码库，则使用 /// <reference types="..." /> 指令：
/// <reference types="someLib" />
function getThing(): someLib.thing;

如果你的代码库依赖于某个模块，则使用 import 语句：
import * as moment from 'moment';
function getThing(): moment;

如果你的全局代码库依赖于某个 UMD 模块，则使用 /// <reference types 指令：
/// <reference types="moment" />
function getThing(): moment;
如果你的模块或 UMD 代码库依赖于某个 UMD 代码库，则使用 import 语句：
import * as someLib from 'someLib';


防止命名冲突
注意，虽说可以在全局作用域内定义许多类型。 但我们强烈建议不要这样做
可以遵循的一个简单规则是使用代码库提供的某个全局变量来声明拥有命名空间的类型
declare namespace cats {
    interface KittySettings {}
}
而不是
interface CatsKittySettings {}
这样做会保证代码库可以被转换成 UMD 模块，且不会影响声明文件的使用者。





最佳实践
应该使用 number ， string ， boolean ,object和 symbol 类型而不是Number ， String ， Boolean ， Symbol 和 Object
不要在回调函数里使用可选参数，除非这是你想要的：

/* 错误 */
interface Fetcher {
    getObject(done: (data: any, elapsedTime?: number) => void): void;
}

不要因回调函数的参数数量不同而编写不同的重载。
原因：回调函数总是允许忽略某个参数的，因此没必要为缺少可选参数的情况编写重载。
/* WRONG */
declare function beforeAll(action: () => void, timeout?: number): void;
declare function beforeAll(
    action: (done: DoneFn) => void,
    timeout?: number
): void;

/* 正确 */
declare function beforeAll(
    action: (done: DoneFn) => void,
    timeout?: number
): void;

不要把模糊的重载放在具体的重载前面：
应该将重载排序，把具体的排在模糊的之前：
/* 正确 */
declare function fn(x: HTMLDivElement): string;
declare function fn(x: HTMLElement): number;
declare function fn(x: any): any;

var myElem: HTMLDivElement;
var x = fn(myElem); // x: string, :)

不要因为只有末尾参数不同而编写不同的重载：
应该尽可能使用可选参数：
/* WRONG */
interface Example {
    diff(one: string): number;
    diff(one: string, two: string): number;
    diff(one: string, two: string, three: boolean): number;
}
/* OK */
interface Example {
    diff(one: string, two?: string, three?: boolean): number;
}


简单的组合：一个名字，多种意义
一个给定的名字 A ，我们可以找出三种不同的意义：一个类型，一个值或一个命名空间。 要如何去解析这个名字要看它所在的上下文是怎样的。 比如，在声明 let m: A.A = A; 中， A 首先被当做命名空间，然后做为类型名，最后是值。 这些意义最终可能会指向完全不同的声明！

TypeScript 工程和 JavaScript 工程都可以使用--declaration 选项来生成声明文件。
如果你的包有一个主 .js 文件，你还需要在 package.json 里指定主声明文件。 设置 types 属性指向捆绑在一起的声明文件。 比如：

{
    "name": "awesome",
    "author": "Vandelay Industries",
    "version": "1.0.0",
    "main": "./lib/main.js",
    "types": "./lib/main.d.ts"
}
同样要注意的是如果主声明文件名是 index.d.ts 并且位置在包的根目录里（与 index.js 并列），你就不需要使用 "types" 属性指定了。

```
