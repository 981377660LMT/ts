import { ResolveType, RejectType, Executor } from '../actiontype'
export default class Promise<T = any>{
  public resolve!: ResolveType
  public reject!: RejectType
  public status: string
  public resolve_executor_value: any
  public reject_executor_value: any
  constructor(executor: Executor) {

    this.status = 'pending'  //状态值

    // 成功
    this.resolve = (value: any) => {
      console.log("进入resolve函数:", value)
      if (this.status === "pending") {
        this.status = 'success'
        this.resolve_executor_value = value
      }
    }
    // 失败
    this.reject = (reason: any) => {
      if (this.status === "pending") {

        this.status = 'reject'
        this.reject_executor_value = reason
      }
    }
    try {
      // 执行函数
      executor(this.resolve, this.reject)
    } catch (err) {
      //console.log(err.toString())
      this.status = "pending"
      // 失败则直接执行reject函数
      this.reject(err.toString())
      throw new Error("程序停止...");
    }
  }

  then(resolveInthen: ResolveType, rejectInThen: RejectType) {

    return new Promise((resolve, reject) => {
      let result;
      console.log("this:", this)
      if (this.status === "success") {
        result = resolveInthen(this.resolve_executor_value)//ok
        resolve(result)
      }
      if (this.status === "reject") {
        result = rejectInThen(this.reject_executor_value)
        reject(result)
      }
    })
  }

  // then1(resolveInthen: ResolveType, rejectInThen: RejectType) {

  //   return new Promise((resolve, reject) => {
  //     let result;
  //     console.log("this:", this)
  //     if (this.status === "success") {
  //       result = resolveInthen(this.resolve_executor_value)// this.resolve_executor_value=ok
  //       resolve(result)
  //     }
  //     if (this.status === "reject") {
  //       result = rejectInThen(this.reject_executor_value)
  //       reject(result)
  //     }
  //   })
  // }

  // then2(resolveInthen: ResolveType, rejectInThen: RejectType) {

  //   return new Promise((resolve, reject) => {
  //     let result;
  //     console.log("this:", this)
  //     if (this.status === "success") {
  //       result = resolveInthen(this.resolve_executor_value)//ok
  //       resolve(result)
  //     }
  //     if (this.status === "reject") {
  //       result = rejectInThen(this.reject_executor_value)
  //       reject(result)
  //     }
  //   })
  // }
}

export { }