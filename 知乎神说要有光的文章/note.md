## Electron + Puppeteer + Robotjs 实现工作自动化

## 门面模式：

前端领域常见的 html、css、还有 vue 的 tempalte 以及 react 的 jsx 都是 `dsl(领域特定语言)`，dsl 的目的就是为了简化调用，是门面模式的典型实现。（template 和 jsx 要由自己做编译，而 html、css 是浏览器做的编译）。此外，babel 和 eslint 等的 preset 也是为了简化使用成本而引入的，不然用户就要直接面对各种复杂的插件配置。

门面模式并没有引入新的功能实现，只是为了简化系统使用成本而引入的一个入口。如果遇到系统使用特别复杂的时候，不妨通过引入一个门面（封装成 api 或者 dsl 的形式）来简化吧。

## vscode 布局

vscode 分为了标题栏、状态栏、内容区，是上中下结构，而内容区又分为了活动栏、侧边栏、编辑区，是左中右结构。窗口可以调整大小，而这个`上中下嵌套左中右`的结构是不变的。
最外层是上中下的结构，可以把`每一块设置为 absolute`，然后分别设置 top 值，然后中间部分由分为了左中右，可以再分别设置左中右部分的 left 值，这样就完成了每一块的布局。
每一块`内部则根据不同的布局需求分别使用流式、弹性`等不同的盒，配合绝对、相对等定位方式来布局。
绝对定位是要指定具体的 top、bottom、left、right 值，是静态的，而窗口大小改变的时候需要动态的设置具体的值。这时候就需要监听窗口的 resize 事件来重新布局，分别计算不同块的位置。而且 vscode 每一块的大小是也是可以拖动改变大小的，也要在拖动的时候重新计算 left、top 的值。

## 前端代码常见的 Provider 是什么

Provider 并不是 23 种经典设计模式之一，但是却应用特别多，可以算是一种比较新的模式。

- React 提供了 Provider 组件用于 context 数据的传递

- VSCode 插件中有各种 registXxxProvider 的 api
  比如智能补全就是注册一个 CompletionProvider，然后根据 document 的内容，返回具体的 CompletionItem 的对象。
  `VSCode 并不关心 CompletionItem 是怎么创建出来的，只知道通过这个 provider 可以拿到需要的 completion 数据，所以设计了 provider 的 api。`

## 静态类型系统的 3 个层次

- 纯静态的类型系统
- 带泛型的静态类型系统 java
- 支持高级类型的静态类型系统 ts
  高级类型支持类型编程，甚至是图灵完备的，图灵完备的意思就是说提供的语言特性可以描述所有可计算的逻辑

## 让 Node.js 变“懒”的 COW 技术(Copy On Write)

“写时复制”，也就是 Copy-On-Write。
复制只是添加一个引用到之前的内容，如果不修改并不会真正复制，只有到第一次修改内容的时候才去真正复制对应的数据块，这样就避免了大量硬盘空间的浪费。

## VSCode 插件的简单又强大的 decorator API

简单又强大的 API:
`editor.setDecorations(decoration, range)`
它的作用就是在 editor 的某个位置到某个位置，也就是某段范围添加一些 CSS，这些 CSS 叫做装饰。
创建 decorator 的 api 是
`window.createTextEditorDecorationType：`

```JS
vscode.window.createTextEditorDecorationType({
  before: {
    contentText:'',
    textDecoration: `none;`
  },
})
```

这个 api 能做啥

- css 的颜色高亮插件 vscode-color-highlight，这个的实现就是通过正则匹配出 color 所在的 range，然后加一个 before 伪元素的装饰，添加背景色
- gitlens 的行内 commit 信息
- 编辑特效在编辑器中放烟花的插件 vscode-power-mode
  原理是 document 内容改变的时候添加 before 伪元素，放一个 gif 图，过段时间消失。

## ts 泛型参数

Test<T> 这个高级类型，有一个泛型参数 T，当 T 传入的类型为联合类型的时候，有两种情况：

- 如果 checkType（extends 左边的类型） 是 T，则把联合类型拆开后解析类型，最后合并成一个联合类型返回。
- 如果 checkType 不是 T，把联合类型整体作为 T 来解析，返回解析后的类型。
  这个语法叫 Distributive Condition Type，分布式条件类型。设计的目的就是为了简化 Test<number> | Test<boolean> 的情况。

## sass 编译器的继任者： dart-sass

ruby sass 和 node-sass 都已经是历史，dart-sass 是 sass 编译器的未来。

## 浏览器的 5 种 Observer

IntersectionObserver 监听元素可见性变化，常用来做元素显示的数据采集、图片的懒加载
MutationObserver 监听元素属性和子节点变化，比如可以用来`做去不掉的水印`
ResizeObserver 监听元素大小变化
PerformanceObserver 监听 performance 记录的行为，来上报数据
ReportingObserver `ReportingObserver` 可以监听过时的 api、浏览器干预等报告等的打印，在回调里上报，这些是错误监听无法监听到但对了解网页运行情况很有用的数据。
