import Promise from './Promise'
// 纯同步
let promise = new Promise((resolve, reject) => {
  resolve("成功了")
  // reject("失败")
})


promise.then((resolveData) => {
  console.log("resolve执行成功后的then函数内的输出:", resolveData);
}, (rejectData) => {
  console.log("reject执行成功后的then函数内的输出:", rejectData);
})

export { }