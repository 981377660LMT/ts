

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    //resolve("第一个异步promise");
    reject("失败")
    resolve("第一个异步promise");
  }, 5)
})

promise.then((resolveResult) => {
  console.log("resolveResult:", resolveResult)
}, (rejectResult) => {
  console.log("rejectResult:", rejectResult)
})