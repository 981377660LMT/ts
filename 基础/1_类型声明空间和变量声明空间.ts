import './2_模块'
// 尽管你定义了interface Bar，却并不能够把它作为一个变量来使用，因为它没有定义在变量声明空间中。
interface Bar {
  bar: number
}
class Bar {}
const bar = Bar
let b = a
