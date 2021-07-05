# JavaScript 项目的类型系统增强

## 一、类型补充声明

### 为什么需要？

如果所有代码都是自己写的，其实没有类型补充声明的必要，但是实际开发过程中必然会涉及到在 TypeScript 项目中导入 JavaScript 模块的情况。

例如 npm 上的第三方模块，都是 JavaScript 模块，由于这些 JavaScript 模块并没有类型声明，所以导致我们在 TypeScript 项目中无法直接使用。

以下案例基于一个普通的 TypeScript 项目

case 1. lodash

```shell
$ npm i lodash
```

```typescript
import { camelCase } from 'lodash' // 无法找到模块“lodash”的声明文件。

const result = camelCase('Hello world')

console.log(result)
```

完整错误信息如下

```
无法找到模块“lodash”的声明文件。“/Users/zce/Desktop/ts-play/node_modules/lodash/lodash.js”隐式拥有 "any" 类型。
尝试使用 `npm i --save-dev @types/lodash` (如果存在)，或者添加一个包含 `declare module 'lodash';` 的新声明(.d.ts)文件
```

一个很基础的场景充分暴露了一个落地 TypeScript 的难题：JavaScript 模块没有类型声明的问题。

解决方法在错误信息里面已经说的很清楚了：

1. 安装对应的类型补充声明模块（推荐）；
2. 自己通过 `.d.ts` 文件声明这个模块；

### 定义模块声明

项目中任意新建一个 `.d.ts` 文件，文件中通过 `declare` 指令声明一个模块，具体代码如下：

```typescript
// 注意：以下代码必须出现在全局作用域中，
// 也就是当前文件中不能有全局的 import or export，
// 因为这会导致当前文件形成模块作用域
declare module 'lodash'
```

> ⚠️ 类型声明文件虽然不需要在代码中引入，但是一定要出现在 `tsconfig.json` 配置的覆盖范围以内，也就是 `include` 属性中所包含的路径中，如果没有配置 `include` 属性，默认包含项目目录下全部文件。

有了声明文件过后，导入 `lodash` 模块就不会报错了，但是也仅仅是不会报错而已，我们实际使用时提取出来的任何成员类型都是 `any`。

TypeScript ⇢ AnyScript

> 📌 如果以上操作之后仍然出现“无法找到模块声明文件”，可以重启一下 TS 语言服务器（提供给 VSCode 分析代码、智能感知的服务）：
>
> VS Code 命令面板执行：`TypeScript: Restart TS server`

### 模块类型声明

如果只是单纯的 `declare` 一个模块，那么 TypeScript 仍然不知道这个模块中具体的成员，以及对应的类型！

这种情况下，我们需要通过完整的模块类型声明代码，完整的表述当前这个模块中应有的成员，以及对应的类型。

具体代码如下：

```typescript
declare module 'lodash' {
  // 方法 1
  export function camelCase(input: string): string
  // 方法 2
  export const camelCase: (input: string) => string
}
```

两种方式都可以表述 `lodash` 模块中导出了一个 `camelCase` 的函数，一个 `string` 类型参数，返回值为 `string` 类型。

默认导出成员

```typescript
declare module 'lodash' {
  export const camelCase: (input: string) => string

  export default {
    camelCase,
  }

  export = lodash
}
```

切记注意一个问题：类型声明文件中仍然写的是符合 TypeScript 语法的代码，也就是说一定需要注意以下情况：

```typescript
declare module 'lodash' {
  interface Lodash {
    camelCase: (input: string) => string
  }

  export default Lodash // => 导出的是一个 interface
}
```

这种方式虽然语法上能行得通，但是并不合乎实际情况，因为真正的 `lodash` 模块导出的是一个 `Lodash` 类型的成员（具象）而不是导出了一个 `Lodash` 类型（抽象）。对于不太熟悉的朋友，很容易陷入这个「陷阱」。

```typescript
declare module 'lodash' {
  export const camelCase: (input: string) => string

  export default {
    camelCase,
  } // => 这里导出的是一个对象，这个对象推导出来的类型
}
```

### 类型补充声明模块

编写类型补充声明存在的问题：

- 费时费力的工作，如果我们大量使用 npm 模块，这个工作几乎不可能完成
- 对于所有使用相同模块的项目，这些类型补充声明完全可以复用
- 类型补充声明应该跟着对应 npm 模块的更新而同步更新

综合以上问题，对于第三方 npm 模块，自己编写类型补充声明一定是不明智的。

TypeScript 官方利用社区生态很好的解决了这个问题：[DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)，核心思想就是为每一个常见的 npm 模块提供一个预设的类型补充声明模块，例如：

- `lodash` → `@types/lodash`
- `express` → `@types/express`
- `@koa/cors` → `@types/koa__cors`
- `@koa/router` → `@types/koa__router`

使用方法很简单：当我们安装一个没有类型声明的 npm 模块时，同时安装一个对应的类型补充声明模块（开发依赖即可）。

```shell
$ npm i lodash
# 安装对应类型补充声明模块
$ npm i @types/lodash --save-dev
```

TypeScript 会自动根据以上规则在对应的目录下找到模块补充声明文件。

### 内置类型的模块

随着 TypeScript 越来越流行，越来越多的 npm 采用 TypeScript 编写，即便不是 TypeScript 编写的项目，也有很多 npm 作者在模块的内部提供额外的类型补充声明，以便于我们在 TypeScript 项目中使用这些模块。

> 📌 提供类型补充声明的好处远不止于方便 TypeScript 项目的使用，即便是普通 JavaScript 项目，这些类型补充声明也能够提供很大的便捷：
>
> - 为编辑器提供更好的类型提示
> - 便于使用工具生成文档
> - etc.

举个例子：npm 模块狂魔：[Sindre Sorhus](https://github.com/sindresorhus) 他的模块基本都已经提供内置的类型声明文件了（而且很多重一点的模块都已经用 TypeScript 重构）

- [got](http://npm.im/got)
- [sort-keys](http://npm.im/sort-keys)

![image-20210121164045484](media/image-20210121164045484.png)

TypeScript 项目在最终编译为 JavaScript 代码时可以自动输出对应类型补充声明文件。

具体方法就是在 `tsconfig.json` 中设置 `declaration: true`。

### 总结

类型补充声明就是用来告诉 TypeScript 一个未知类型模块的类型，说白了就是「骗骗」TypeScript 编译器的，对实际的代码执行不会产生任何影响。

使用场景也很多，并不局限于引入第三方 npm 模块的问题，比如：前端项目里面使用 `import` 导入图片、CSS 这些：

```typescript
declare module '*.png' {
  const url: string
  export default url
}

declare module '*.css'
```

针对 npm 上大量的 JavaScript 模块无法直接在 TS 项目中使用的问题：

1. 项目内添加 `.d.ts`，通过 `declare module` 的方式声明
2. 尝试去安装 `@types/xxx` 类型补充声明模块
3. 一般新模块都会自己内置当前模块的类型补充声明文件

> https://www.typescriptlang.org/docs/handbook/2/type-declarations.html#definitelytyped--types

## 二、JS 项目中的类型增强

### 类型注解

在常见的 IDE 中，普通的 JavaScript 可以通过 [JSDoc](https://jsdoc.app) 的方式增强类型系统。

```javascript
/** @type {string} */
const foo = 'hello jsdoc'

/** @type {{ name: string, age: number }} */
const foo = { name: 'zce', age: 25 }

/**
 * @param {string} name name
 * @param {number} age nuber
 * @returns {string}
 */
function foo(name, age) {
  return `${name} ${age}`
}
```

其中比较常见的注解标记：

- `@type`
- `@param` (or `@arg` or `@argument`)
- `@returns` (or `@return`)
- `@typedef` 定义类型
- `@callback`
- `@template` 泛型
- `@class` (or `@constructor`)
- `@this`
- `@extends` (or `@augments`)
- `@enum`

#### 作用于类的特殊标记

- [Property Modifiers](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#jsdoc-property-modifiers) `@public`, `@private`, `@protected`, `@readonly`

> References:
>
> - https://jsdoc.app
> - https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html

### Dashboard 类型增强案例

1. 配置文件类型
2. router 类型
3. store 类型
4. plugin 类型

### 类型检查

`@ts-check`

### 总结

市面上对于目前前端项目中的类型系统有几个不同的级别：

- 完全使用「裸奔」的 JavaScript，类型基于 JavaScript 本身推导；
- 通过 JSDoc 的配合，以类型注解增强类型系统；
- 为项目中每个 JavaScript 文件添加 `// @ts-check`，开启类型检查；
- 基本使用 TypeScript（AnyScript）；
- 完全使用 TypeScript（strict 模式 + 强 lint：ts-standard）；

> https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html

JavaScript 项目中如何有更好的类型提示：JSDoc + [import-types](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#import-types)

## 三、\* npm 安装模块失败的问题

> - https://github.com/imagemin
> - https://github.com/sass/node-sass

- 复盘整个安装过程

**npm instal xxx 先调用一个 npm registry 的接口**

请求回来
https://registry.npmjs.com/gulp-imagemin

**dist-tags** 中的 **latest** 找到要下载的模块版本

versions 中对应版本的信息

**dependencies**

gulp-imagemin

- chalk
- xxxx

结论：可以通过配置 npm registry 提高 npm 模块下载速度

下载完 npm 模块过后，解压到 node_modules 目录

**解压完成会检查这个模块的 package.json 中的 scripts**
会依次执行
**install**
**postinstall**

postinstall 一般是用于安装这个模块依赖的一些**二进制模块**（这个依赖关系不是由 npm 维系的）

安装 二进制模块 一般有两个选择

1. 直接去网络上下载预编译的文件
2. 直接在本地编译这个二进制模块的源码

**为什么模块依赖的二进制模块要** postinstall=>mac 和 windows 可执行文件不一样，直接下载

imagemin 一系列的模块都存在这个问题，这一系列的模块不支持为 二进制文件 配置 mirror，只能通过 配置 hosts

- 找到可能出问题的点
- 依次解决每种类型的问题

- 网络问题
- 环境问题

npm 安装模块的镜像配置
**官方建议 dart-sass**

<!-- .npmrc的配置 -->

```ini
# global config
# prefix = C:/Users/zce/AppData/Roaming/npm
msvs_version = 2017
# python = python2.7

# init config
init-author-name = zce
init-author-email = w@zce.me
init-author-url = https://zce.me
init-version = 0.1.0
init-license = MIT

# git tag message
message = "chore: version bump to v%s"

# mirror config
sharp_binary_host = https://npm.taobao.org/mirrors/sharp
sharp_libvips_binary_host = https://npm.taobao.org/mirrors/sharp-libvips
profiler_binary_host_mirror = https://npm.taobao.org/mirrors/node-inspector/
fse_binary_host_mirror = https://npm.taobao.org/mirrors/fsevents
node_sqlite3_binary_host_mirror = https://npm.taobao.org/mirrors
sqlite3_binary_host_mirror = https://npm.taobao.org/mirrors
sqlite3_binary_site = https://npm.taobao.org/mirrors/sqlite3
sass_binary_site = https://npm.taobao.org/mirrors/node-sass
electron_mirror = https://npm.taobao.org/mirrors/electron/
puppeteer_download_host = https://npm.taobao.org/mirrors
chromedriver_cdnurl = https://npm.taobao.org/mirrors/chromedriver
operadriver_cdnurl = https://npm.taobao.org/mirrors/operadriver
phantomjs_cdnurl = https://npm.taobao.org/mirrors/phantomjs
python_mirror = https://npm.taobao.org/mirrors/python
registry = https://registry.npm.taobao.org/
disturl = https://npm.taobao.org/dist
```

```ini
# GitHub Start =================================================================
52.74.223.119 github.com
192.30.255.116 api.github.com
185.199.108.154 docs.github.com
52.5.36.149 graphql.github.com
140.82.112.25 live.github.com
8.7.198.45 gist.github.com

192.0.66.2 github.blog

185.199.108.154 github.githubassets.com

50.17.56.103 collector.githubapp.com
52.217.67.172 github-cloud.s3.amazonaws.com

140.82.114.22 central.github.com

199.232.96.133 raw.githubusercontent.com
199.232.96.133 user-images.githubusercontent.com
199.232.96.133 desktop.githubusercontent.com
199.232.96.133 camo.githubusercontent.com

199.232.96.133 media.githubusercontent.com
199.232.96.133 avatars.githubusercontent.com
199.232.96.133 avatars0.githubusercontent.com
199.232.96.133 avatars1.githubusercontent.com
199.232.96.133 avatars2.githubusercontent.com
199.232.96.133 avatars3.githubusercontent.com
199.232.96.133 avatars4.githubusercontent.com
199.232.96.133 avatars5.githubusercontent.com
199.232.96.133 avatars6.githubusercontent.com
199.232.96.133 avatars7.githubusercontent.com
199.232.96.133 avatars8.githubusercontent.com
199.232.96.133 avatars9.githubusercontent.com
199.232.96.133 avatars10.githubusercontent.com
199.232.96.133 avatars11.githubusercontent.com
199.232.96.133 avatars12.githubusercontent.com
199.232.96.133 avatars13.githubusercontent.com
199.232.96.133 avatars14.githubusercontent.com
199.232.96.133 avatars15.githubusercontent.com
199.232.96.133 avatars16.githubusercontent.com
199.232.96.133 avatars17.githubusercontent.com
199.232.96.133 avatars18.githubusercontent.com
199.232.96.133 avatars19.githubusercontent.com
199.232.96.133 avatars20.githubusercontent.com
# GitHub End ===================================================================

104.16.18.35 www.npmjs.org
104.16.18.35 registry.npmjs.org
104.16.92.83 www.npmjs.com
104.16.18.35 registry.npmjs.com
```

## 四、Vue.js 2.0 项目升级 3.0

1. 模块升级
2. element-ui → element-plus
3. Breaking change
4. 逐渐使用新特性
