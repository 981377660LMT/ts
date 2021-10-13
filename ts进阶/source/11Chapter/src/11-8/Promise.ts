import { ResolveType, RejectType, Executor } from '../actiontype'

export default class Promise<T = any>{
  public resolve!: ResolveType
  public reject!: RejectType
  public status: string
  public resolve_executor_value: any
  public reject_executor_value: any
  // 保存成功状态要执行的函数
  public resolve_then_callbacks: (() => void)[] = []
  // 保存失败状态要执行的函数
  public reject_then_callbacks: (() => void)[] = []
  constructor(executor: Executor) {

    this.status = 'pending'  //状态值

    // 成功
    this.resolve = (value: any) => {
      if (this.status === "pending") {

        this.status = 'success'
        this.resolve_executor_value = value
        this.resolve_then_callbacks.forEach(callback => callback())
      }
    }
    // 失败
    this.reject = (reason: any) => {
      if (this.status === "pending") {

        this.status = 'reject'
        this.reject_executor_value = reason
        this.reject_then_callbacks.forEach(callback => callback())
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
    console.log("进入then方法");
    return new Promise((resolve, reject) => {
      let result: any;
      if (this.status === "success") {
        result = resolveInthen(this.resolve_executor_value)//ok
        resolve(result)
      }

      if (this.status === "reject") {
        result = rejectInThen(this.reject_executor_value)
        reject(result)
      }
      if (this.status === "pending") {
        console.log("进入到then方法的pending块");
        this.processManyAsyncAndSync(resolveInthen, rejectInThen, resolve, reject);
      }
    })
  }

  /**
   * 执行多个异步+多级then的处理方法
   * @param resolveInthen 
   * @param rejectInThen 
   * @param resolve 
   * @param reject 
   */
  processManyAsyncAndSync(resolveInthen: ResolveType, rejectInThen: RejectType,
    resolve: ResolveType, reject: RejectType) {
    let result: any
    this.resolve_then_callbacks.push(() => {

      result = resolveInthen(this.resolve_executor_value)
      if (isPromise(result)) {// 是异步的Promise对象
        result.then((resolveSuccess) => {
          resolve(resolveSuccess)
        }, (rejectSucess) => {
          reject(rejectSucess)
        })
      } else {
        resolve(result)// 如果是普通的数据,不是异步的Promise对象
      }
    })
    this.reject_then_callbacks.push(() => {
      result = rejectInThen(this.reject_executor_value)
      reject(result)
    })
  }

  then1(resolveInthen: ResolveType, rejectInThen: RejectType) {
    console.log("进入then1方法");
    return new Promise((resolve, reject) => {
      let result;
      if (this.status === "success") {
        result = resolveInthen(this.resolve_executor_value)//ok
        resolve(result)
      }

      if (this.status === "reject") {
        result = rejectInThen(this.reject_executor_value)
        reject(result)
      }
      if (this.status === "pending") {
        console.log("进入到then1方法的pending块");
        this.resolve_then_callbacks.push(() => {
          result = resolveInthen(this.resolve_executor_value)
          resolve(result)
        })
        this.reject_then_callbacks.push(() => {
          result = rejectInThen(this.reject_executor_value)
          reject(result)
        })
      }
    })
  }
}

function isPromise(val: any): val is Promise {
  return isObject(val) && isFunction(val.then)
}

function isObject(val: any): val is Record<any, any> {
  return val !== null && typeof val === "object"
}

function isFunction(data: any): data is Function {
  return typeof data === "function"
}


// let obj: object = {}
// obj.then = "df"

// let val : Record<any, any> = {}
// val.then = "df"
// val ["then"]="df"

export { }