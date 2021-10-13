import Promise from './Promise'
let promise1 = new Promise((resolve, reject) => {
  console.log("第一个Promise的同步区域");// S85
  setTimeout(() => {// 异步区
    resolve("setTimeout第一个Promise");
  }, 5)
})

let promise2 = new Promise((resolve, reject) => {
  console.log("第二个Promise的同步区域");// S85
  setTimeout(() => {// 异步区
    reject("setTimeout第二个Promise");
  }, 5)
})


let promise3 = new Promise((resolve, reject) => {
  console.log("第三个Promise的同步区域");
  setTimeout(() => {// 异步区
    resolve("setTimeout==第三个Promise");
  }, 5)
})

Promise.all([promise1, promise2, promise3]).then((resolveValue) => {
  console.log("Promise.all==>哈哈resolveValue:", resolveValue)
}, (rejectValue) => {
  console.log("Promise.all==>哈哈rejectValue失败:", rejectValue)
})

export { }