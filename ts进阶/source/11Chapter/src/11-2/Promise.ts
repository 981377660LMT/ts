import { ResolveType, RejectType, Executor } from '../actiontype'
export default class Promise<T = any>{
  public resolve!: ResolveType
  public reject!: RejectType
  public status!: string
  public resolve_executor_value!: any
  public reject_executor_value!: any
  constructor(executor: Executor) {
    this.status = "pending";//起始等待状态
    this.resolve = (successvalue: any): any => {
      if (this.status === "pending") {
        this.status = "success"
        this.resolve_executor_value = successvalue;
        console.log("resolve==>value:", successvalue);
      }
    }

    this.reject = (failvalue: any): any => {
      if (this.status === "pending") {
        this.status = "fail"
        this.reject_executor_value = failvalue
        console.log("reject==>value:", failvalue);
      }
    }
    executor(this.resolve, this.reject)
  }

  then(resolveInthen: ResolveType, rejectInThen: RejectType) {

    if (this.status === "success") {
      resolveInthen(this.resolve_executor_value)
      console.log("resolveInthen被执行");
    }
    if (this.status === "fail") {
      rejectInThen(this.reject_executor_value)
      console.log("resolveInthen被执行");
    }
  }
}


export { }