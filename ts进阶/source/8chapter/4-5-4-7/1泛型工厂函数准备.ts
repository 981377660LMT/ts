
// 函数类型复习
type promiseFuncType = (resolve: string, reject: string) => any
// promiseFuncType 表示一种函数类型  promiseFunc是promiseFuncType函数类型的变量
let promiseFunc: promiseFuncType = function (resolve, reject): void {
  console.log(resolve,reject)
}

promiseFunc("success","reject")


class Promise {
  constructor(promiseFunc: promiseFuncType) {
    promiseFunc("sucess", "fail");
  }
}
let promise=new Promise(function (resolve, reject): void {
  console.log(resolve,reject)
})




export { }























// type promiseFuncType = (resolve: string, reject: string) => any
// // promiseFuncType 表示一种函数类型  promiseFunc是promiseFuncType函数类型的变量
// let promiseFunc: promiseFuncType




// class Promise {
//   constructor(promiseFunc2: promiseFuncType) {
//     promiseFunc2("sucess", "fail");
//   }
// }