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
}).then((resolveData2) => {
  console.log("第二个then成功了:", resolveData2);
  return "ok2"
}, (rejectData2) => {
  console.log("第二个then失败了:", rejectData2);
  return "fail2"
}).then((resolveData3) => {
  console.log("第三个then成功了:", resolveData3);
  return "ok2"
}, (rejectData3) => {
  console.log("第三个then失败了:", rejectData3);
  return "fail2"
})
console.log("end")
export { }