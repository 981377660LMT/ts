import Promise from './Promise'

// 
let promise = new Promise((resolve, reject) => {
  // 模拟宏任务异步执行过程
  setTimeout(() => {
    resolve("成功了")
  }, 5);
})


promise.then((resolveData1) => {
  console.log("第一个then成功了:", resolveData1);
  return "ok"
}, (rejectData1) => {
  console.log("第一个then失败了:", rejectData1);
  return "fail1"
})
console.log("end")
export { }