// JavaScript 初学者可能有时候仅仅是抛出一个原始字符串：
// 不要这么做，使用 Error 对象的基本好处是，它能自动跟踪堆栈的属性构建以及生成位置。
// 你可以通过为每个可能抛出错误的代码显式捕获，来使其优雅：

// 除非你想用以非常通用（try/catch）的方式处理错误，否则不要抛出错误。
const validate = (value: number) => {
  if (value < 0 || value > 100) {
    return { error: 'Invalid value' }
  }
}
