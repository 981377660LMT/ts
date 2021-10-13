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
        console.log("失败的:", this.reject_executor_value);

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

    if (this.status === "success") {
      resolveInthen(this.resolve_executor_value)
      console.log("resolveInthen被执行");
    }
    if (this.status === "reject") {
      rejectInThen(this.reject_executor_value)
      console.log("resolveInthen被执行");
    }
  }
}



export { }