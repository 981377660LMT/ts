import Promise from './Promise'
// 纯同步
let promise = new Promise((resolve, reject) => {
  resolve("成功了")
  //reject("失败")
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
  return "ok3"
}, (rejectData3) => {
  console.log("第三个then失败了:", rejectData3);
  return "fail13"
})

export { }