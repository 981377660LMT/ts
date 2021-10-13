// 这里只是初步了解Promise底层源码的代码片段，后面我们会有单独章节带领同学们手写 Promise 全部源码
type ResolveType = (resolve_success: any) => any
type RejectType = (reject_fail: any) => any
class Promise {
  public resolveFunc!: ResolveType
  public rejectFunc!: RejectType
  //  promiseParams 函数类型为(resolve: ResolveType, reject: RejectType) => any的参数
  constructor(promiseParams: (resolve: ResolveType, reject: RejectType) => any) {
    this.resolveFunc = (resolve_success: any): any => {// S98
      console.log("this.resolveFunc", resolve_success)
    }
    this.rejectFunc = (reject_fail: any): any => {// S99
      console.log("this.rejectFunc:", reject_fail)
    }
    // 执行promiseParams 等于是执行S100的代码
    promiseParams(this.resolveFunc, this.rejectFunc);
  }
}

new Promise(function (resolve: ResolveType, reject: RejectType): any {// S100
  resolve("成功了")// 执行S98函数 
  reject("失败了")// 执行S99函数
})



export { }