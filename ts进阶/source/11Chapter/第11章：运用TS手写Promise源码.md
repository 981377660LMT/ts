## 慕课网 TS 高级课程

### 	  第 11 章：运用 TS 手写 Promise 源码

**技能大纲**

**11-1   【准备】  Promise 的三种状态和注意细节 【会的同学略过】**   

**11-2  【 手写源码】  Promise 第一步—— Promise 回调 +then 初步 实现  **

**11-3  【手写源码】  resolve 方法 执行失败后的处理**

**11-4  【手写源码】  同步 级联 then 方法  实现  **

**11-5  【手写源码】   实现单级异步+单级 then 方法  ** 

**11-6  【手写源码】    实现单级异步+级联 then 方法  ** 

**11-7  【手写源码】   构建多异步+级联 then 【 第一种实现方式 】  ** 

**11-8  【手写源码】  构建多异步+级联 then 【 第二种实现方式 】  **

**11-9  【手写源码】 Promise.all  源码实现**



**11-1   【准备】  Promise 的三种状态和注意细节	【会的同学略过】** 

**promise 的三种状态**：pending ，resolve，reject 。pending 就是 等待，resolve可以理解为成功，reject 可以理解为拒绝

**pending 状态 理解**： 代表等待的状态，pending状态下，可能执行 resolve（）的方法，也可能执行 reject（）方法。 创建好 Promise 对象 后，但在执行 resolve（）或 reject（）前 为 Pending 状态。

resolve状态 理解**  代表成功态，执行 resolve（）方法后的状态。

**reject 状态** 理解，代表 失败 态，执行 reject（）方法后的状态。

**状态特性**：一旦成功了就不能失败，反过来也是一样。

**then方法**： 每个 promsie 都有一个 then 方法。

**其他也执行 reject 的 场景：** 正在执行 resolve（）方法报错了，也进入 reject 失败状态。



**慕课网 TS 高级课程**

**11-2  【 手写源码 】 Promise 第一步—— Promise 回调 +then 初步 实现    **

**课程安排：**  1. 实现 actiontype    2.  Promise 回调实现   3. 测试类实现

**1. 实现 actiontype** 

```js
type ResolveType<T = any> = (resolve_success_value: T) => any
type FailType = (reject_fail_value: any) => any

type ExecutorType<T> = (resolve: ResolveType, reject: FailType) => any
export { ResolveType, FailType, ExecutorType }
```

**2.  Promise 回调实现**  

```js
import { ResolveType, FailType, ExecutorType } from '../actiontype'
export default class Promise<T = any>{
  public resolve!: ResolveType
  public reject: FailType
  public resolve_success_value: any
  public reject_fail_value: any
  public status: string

  constructor(executor: ExecutorType<T>) {
    this.status = 'pending'  // 初始状态为pending
    this.resolve = (success: any) => {
      console.log("进入构造函数resolve...");
      if (this.status === "pending") {
        this.status = "success"
        this.resolve_success_value = success
      }
    }

    this.reject = (err: any) => {
      console.log("进入失败态");
      if (this.status === 'pending') {
        this.status = "reject"
        this.reject_fail_value = err
      }
    }
    executor(this.resolve, this.reject)
  }

  then(resolveInThen: ResolveType, rejectinThen: FailType) {

    if (this.status === "success") {
      resolveInThen("then函数:" + this.resolve_success_value)
    }
    if (this.status === "reject") {
      rejectinThen("失败函数:" + this.reject_fail_value)
    }
  }
}
```

  **3. 测试类实现**

```js
import { ResolveType, FailType } from '../actiontype'
import Promise from './2promisethen'
let fs = require('fs')

let promise = new Promise((resolve, reject) => {
  resolve("abc")
})

promise.then((successinfo) => {
  console.log("successinfo:", successinfo);
}, (errorinfo) => {
  console.log("errorinfo:", errorinfo);
})
```



**慕课网 TS 高级课程**

**11-3  【 手写源码 】  resolve 方法 执行失败后的处理**

```js
import { ResolveType, FailType, ExecutorType } from '../actiontype'
export default class Promise<T = any>{
  public resolve!: ResolveType
  public reject: FailType
  public resolve_success_value: any
  public reject_fail_value: any
  public status: string

  constructor(executor: ExecutorType<T>) {
    this.status = 'pending'  //状态值

    this.resolve = (success: any) => {

      console.log("进入构造函数resolve...");
      if (this.status === "pending") {
        this.status = "success"
        this.resolve_success_value = success
      }
    }

    this.reject = (err: any) => {
      console.log("进入失败态");
      if (this.status === 'pending') {
        this.status = "reject"
        this.reject_fail_value = err
      }
    }
    try {
      executor(this.resolve, this.reject)
    } catch (err) {
      console.log("进入失败..catch");
      // 失败则直接执行reject函数
      this.reject(err);
    }
  }

  then(resolve: ResolveType, reject: FailType) {

    if (this.status === "success") {
      resolve("then函数:" + this.resolve_success_value)
    }
    if (this.status === "reject") {
      reject("失败函数:" + this.reject_fail_value)
    }
  }
}
```



**慕课网 TS 高级课程**

**11-4  【 手写源码 】  同步级联 then 方法实现  **

**本节安排**： 1. 修改 Promise 类     2.  修改测试类

**1. 修改 Promise 类**  

```js
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
        result = resolveInthen(this.resolve_executor_value)
        resolve(result)
      }
      if (this.status === "reject") {
        result = rejectInThen(this.reject_executor_value)
        reject(result)
      }
    })
  }


}

export { }



```

**2.  修改测试类**

```js
import { ResolveType, FailType } from '../actiontype'
import Promise from './2promisethen'
let fs = require('fs')

let promise = new Promise((resolve, reject) => {
  resolve("abc")
})

promise.then((successinfo) => {
  console.log("then1:successinfo:", successinfo);
  return "ok1"
}, (errorinfo) => {
  console.log("errorinfo:", errorinfo);
}).then(successinfo2 => {
  console.log("successinfo2:", successinfo2);
  return "ok2"
}, (errorinfo) => {
  console.log("errorinfo:", errorinfo);
})
console.log("end")
export { }
```



**慕课网 TS 高级课程** 

**11-5  【手写源码】   实现单级异步+单级 then 方法  ** 

**本节安排**： 1.  Promise 类     2.  修改测试类

```js
import { ResolveType, FailType } from '../actiontype'
export default class Promise<T = any>{
  public resolve!: ResolveType
  public reject: FailType
  public resolve_success_value: any
  public reject_fail_value: any
  public status: string

  // 保存成功状态要执行的函数
  public onResolveCallbacks: (() => void)[] = []
  // 保存失败状态要执行的函数
  public onRejectCallbacks: (() => void)[] = []

  constructor(executor: (resolve: ResolveType, reject: FailType) => any) {
    this.status = "pending"
    console.log("构造函数状态:", this.status);
    this.resolve = (resolvevalue: any) => {

      console.log("进入resolve...");
      if (this.status === "pending") {
        this.status = "success"
        this.resolve_success_value = resolvevalue
        this.onResolveCallbacks.forEach(callback => callback())
      }
    }

    this.reject = (err: any) => {
      console.log("错误reject");
      if (this.status === 'pending') {
        this.status = "fail"
        this.reject_fail_value = err
        this.onRejectCallbacks.forEach(callback => callback())
      }
    }
    try {
      executor(this.resolve, this.reject)// S99
    } catch (err) {
      console.log("进入reject....catch");
      // 失败则直接执行reject函数
      this.reject(err);
    }
  }

  then(resolveInThen: ResolveType, rejectInThen: FailType) {
    console.log("this.status:", this.status)
    let result;
    return new Promise((resolve, reject) => {
      if (this.status === "success") {
        result = resolveInThen("then函数:" + this.resolve_success_value)//S101
        resolve(result)
      }
      if (this.status === "fail") {
        result = rejectInThen("失败函数:" + this.reject_fail_value)
        reject(result)
      }
      if (this.status === "pending") {
        this.onResolveCallbacks.push(() => {
          resolveInThen(this.resolve_success_value)
        })
        this.onRejectCallbacks.push(() => {
          rejectInThen(this.reject_fail_value)
        })
      }
    })
  }
}
```

  **2.  测试类**

```js
import { ResolveType, FailType } from '../actiontype'
import Promise from './2promisethen'
let fs = require('fs')

let promise = new Promise((resolve, reject) => {

  console.log("Promise同步区域");
  let filePath = __dirname + "/allfile/rootfile.txt"
  fs.readFile(filePath, (err: any, data: any) => {
    console.log("fs.readFile");
    if (data) {
      resolve(data.toString())
    }
  })
})

promise.then((successinfo) => {
  console.log("then1=>successinfo:", successinfo);
  return "then1==>ok"
}, (errorinfo) => {
  console.log("then1=>errorinfo:", errorinfo);
})
console.log("end")
export { }
```

**慕课网 TS 高级课程**

**11-6  【 手写源码 】  发布订阅 实现 单级异步+级联 then 方法  ** 

本节安排： 1. 修改测试类      2.  理解 单级异步 级联 then 执行步骤

```js
import { ResolveType, FailType } from '../actiontype'
import Promise from './2promisethen'
let fs = require('fs')

let promise = new Promise((resolve, reject) => {

  console.log("Promise同步区域");
  let filePath = __dirname + "/allfile/rootfile.txt"
  fs.readFile(filePath, (err: any, data: any) => {
    console.log("fs.readFile");
    if (data) {
      resolve(data.toString())
    }
  })
})

promise.then((successinfo) => {
  console.log("then1=>successinfo:", successinfo);
  return "then1==>ok"
}, (errorinfo) => {
  console.log("then1=>errorinfo:", errorinfo);
})
console.log("end")
export { }
```



**慕课网 TS 高级课程**

**11-7  【  手写源码 】   构建多异步+级联 then 【 第一种实现方式，首创实现方式 】  ** 

本节实现  1. 升级 Promise 类 实现 多级异步+级联 then    2. 修改测试类  

 **1   多级异步+级联 then 第一种实现方式**

```js
import { ResolveType, FailType } from '../actiontype'
export default class Promise<T = any>{
  public resolve!: ResolveType
  public reject: FailType
  public resolve_success_value: any
  public reject_fail_value: any
  public status: string

  // 保存成功状态要执行的函数
  public onResolveCallbacks: (() => void)[] = []
  // 保存失败状态要执行的函数
  public onRejectCallbacks: (() => void)[] = []

  constructor(executor: (resolve: ResolveType, reject: FailType) => any) {
    this.status = "pending"
    console.log("构造函数状态:", this.status);
    this.resolve = (resolvevalue: ResolveType) => {

      console.log("进入resolve...");
      if (this.status === "pending") {
        this.status = "success"
        this.resolve_success_value = resolvevalue
        this.onResolveCallbacks.forEach(callback => callback())
      }
    }

    this.reject = (err: FailType) => {
      console.log("进入reject...");
      if (this.status === 'pending') {
        this.status = "fail"
        this.reject_fail_value = err
        this.onRejectCallbacks.forEach(callback => callback())
      }
    }
    try {
      executor(this.resolve, this.reject)
    } catch (err) {
      // 失败则直接执行reject函数
      this.reject(err);
    }
  }

  then(resolveInThen: ResolveType, rejectInThen: FailType) {
    console.log("执行then函数this.status:", this.status)
    let result;
    return new Promise((resolve, reject) => {
      if (this.status === "success") {
        result = resolveInThen("then函数:" + this.resolve_success_value)
        resolve(result)
      }
      if (this.status === "fail") {
        result = rejectInThen("失败函数:" + this.reject_fail_value)
        reject(result)
      }
      if (this.status === "pending") {
        console.log("进入pending");
        this.onResolveCallbacks.push(() => {
          result = resolveInThen(this.resolve_success_value)
          if (isPromise(result)) {
            setTimeout(() => {
              resolve(result.resolve_success_value)
            }, 100)
          } else {
            resolve(result)
          }
        })
        this.onRejectCallbacks.push(() => {
          result = rejectInThen(this.reject_fail_value)
          if (isPromise(result)) {
            setTimeout(() => {
              reject(result)
            }, 100)
          } else {
            reject(result)
          }
        })
      }
    })
  }
}

// 自定义守卫实现 isPromise 方法
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then)
}
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'
```



**慕课网 TS 高级课程**

**11-8  【  手写源码 】   构建多异步+级联 then 【 第二种实现方式 】  ** 

多异步+级联 then 第二种实现方式

**1 升级 Promise 类**

```js
import { ResolveType, FailType } from '../actiontype'
export default class Promise<T = any>{
  public resolve!: ResolveType
  public reject: FailType
  public resolve_success_value: any
  public reject_fail_value: any
  public status: string

  // 保存成功状态要执行的函数
  public onResolveCallbacks: (() => void)[] = []
  // 保存失败状态要执行的函数
  public onRejectCallbacks: (() => void)[] = []

  constructor(executor: (resolve: ResolveType, reject: FailType) => any) {
    this.status = "pending"
    console.log("构造函数状态:", this.status);
    this.resolve = (resolvevalue: ResolveType) => {

      console.log("进入resolve...");
      if (this.status === "pending") {
        this.status = "success"
        this.resolve_success_value = resolvevalue
        this.onResolveCallbacks.forEach(callback => callback())
      }
    }

    this.reject = (err: FailType) => {
      console.log("进入reject...");
      if (this.status === 'pending') {
        this.status = "fail"
        this.reject_fail_value = err
        this.onRejectCallbacks.forEach(callback => callback())
      }
    }
    executor(this.resolve, this.reject)
  }

  then(resolveInThen: ResolveType, rejectInThen: FailType) {
    console.log("执行then函数this.status:", this.status)//S88
    let callbackPromiseOrData;
    return new Promise((resolve, reject) => {//S89
      if (this.status === "success") {
        callbackPromiseOrData = resolveInThen("then函数:" + this.resolve_success_value)
        resolve(callbackPromiseOrData)
      }
      if (this.status === "fail") {
        callbackPromiseOrData = rejectInThen("失败函数:" + this.reject_fail_value)
        reject(callbackPromiseOrData)
      }
      if (this.status === "pending") {//S90
        console.log("进入pending");
        this.onResolveCallbacks.push(() => {

          callbackPromiseOrData = resolveInThen(this.resolve_success_value)
          if (isPromise(callbackPromiseOrData)) {
            callbackPromiseOrData.then((myresolve: ResolveType) => {
              resolve(callbackPromiseOrData.resolve_success_value);
            }, (error: any) => {
              reject(callbackPromiseOrData.reject_fail_value)
            })
          } else {
            resolve(callbackPromiseOrData)
          }
        })
        this.onRejectCallbacks.push(() => {
          callbackPromiseOrData = rejectInThen(this.reject_fail_value)
          if (isPromise(callbackPromiseOrData)) {
            setTimeout(() => {
              reject(callbackPromiseOrData)
            }, 100)
          } else {
            reject(callbackPromiseOrData)
          }
        })
      }
    })
  }
}

export const isObject = (val: any): val is Record<any, any> =>
  val !== null && typeof val === 'object'
export const isPromise = (val: any): val is Promise => {
  console.log("Promise方法判断，是否为Promise类型....");
  return isObject(val) && isFunction(val.then)
}
export const isFunction = (val: any): val is Function =>
  typeof val === 'function'

export { }
```

**2. 修改测试类**

```js
import { ResolveType, FailType } from '../actiontype'
import Promise from './2promisethen'
let fs = require('fs')

let promise = new Promise((resolve, reject) => {
  let result = __dirname + "/allfile/rootfile.txt"
  console.log("第一个Promise的同步区域");
  fs.readFile(__dirname + "/allfile/rootfile.txt", (err: any,
    data: any) => {
    reject(data.toString())
  })
})

promise.then((successpath) => {
  console.log("then1=>{successpath}:");
  return new Promise((resolve, reject) => {
    console.log("第二个Promise的同步区域");
    fs.readFile(`${__dirname}${successpath}`, (err: any,
      data: any) => {
      console.log("fs.readFile");
      resolve(data.toString())
    })
  })
}, (errorinfo) => {
  console.log("then1=>errorinfo:", errorinfo);
  return "第一个错误返回"
}).then(successinfo2 => {
  console.log("then2=>successinfo:", successinfo2)
}, (errorinfo2) => {
  console.log("then2=>errorinfo2:", errorinfo2);
})
console.log("end")
export { }
```



**慕课网 TS 高级课程**

**11-9  【手写源码】 Promise.all  源码实现**

本节安排  1. all 静态方法实现   2. 测试类实现

 **1. all 静态方法实现**

```js
import { ResolveType, FailType } from '../actiontype'
export default class Promise<T = any>{
  public resolve!: ResolveType
  public reject: FailType
  public resolve_success_value: any
  public reject_fail_value: any
  public status: string

  // 保存成功状态要执行的函数
  public onResolveCallbacks: (() => void)[] = []
  // 保存失败状态要执行的函数
  public onRejectCallbacks: (() => void)[] = []

  constructor(executor: (resolve: ResolveType, reject: FailType) => any) {
    this.status = "pending"
    console.log("构造函数状态:", this.status);
    this.resolve = (resolvevalue: ResolveType) => {

      console.log("进入resolve...");
      if (this.status === "pending") {
        this.status = "success"
        this.resolve_success_value = resolvevalue
        this.onResolveCallbacks.forEach(callback => callback())
      }
    }

    this.reject = (err: FailType) => {
      console.log("进入reject...");
      if (this.status === 'pending') {
        this.status = "fail"
        this.reject_fail_value = err
        this.onRejectCallbacks.forEach(callback => callback())
      }
    }
    executor(this.resolve, this.reject)
  }
    static all(promises: Promise[]) {
        return new Promise((resolve, reject) => {
          let resolveArray: Array<any> = []
          promises.forEach((promise, index) => {
            promise.then((resolveValue) => {
              ProcessData(resolveValue, index)
            }, (rejectValue) => {
              reject(rejectValue)
              return;
            })
          })

          function ProcessData(resolveData: any, index: number) {
            resolveArray[index] = resolveData
            if (index === promises.length - 1) {
              resolve(resolveArray)
              return;
            }
          }
        })
      }

  static all2<T extends Promise[]>(promises: T) {
    return new Promise((resolve, reject) => {
      let resolveArray: Array<any> = []// 保存每一个 promise 对象成功处理的结果的数组 
      promises.reduce(function (results: any, currPromise: Promise,
        index: number) {
        console.log("index:", index)
        currPromise.then((resolveValue) => {
          ProcessData(resolveValue, index)
        }, (rejectValue) => {
          reject(rejectValue)// 任何一个promise失败,都执行reject
          return
        })
      }, [])

      function ProcessData(resolvedata: any, index: number) {
        console.log(`ProcessData=resolvedata...${index}`, resolvedata);
        resolveArray[index] = resolvedata;
        if (index === promises.length - 1) {
          resolve(resolveArray)
        }
      }
    })
  }



  then(resolveInThen: ResolveType, rejectInThen: FailType) {
    console.log("执行then函数this.status:", this.status)//S88
    let callbackPromiseOrData;
    return new Promise((resolve, reject) => {//S89
      if (this.status === "success") {
        callbackPromiseOrData = resolveInThen("then函数:" + this.resolve_success_value)
        resolve(callbackPromiseOrData)
      }
      if (this.status === "fail") {
        callbackPromiseOrData = rejectInThen("失败函数:" + this.reject_fail_value)
        reject(callbackPromiseOrData)
      }
      if (this.status === "pending") {//S90
        console.log("进入pending");
        this.onResolveCallbacks.push(() => {
          callbackPromiseOrData = resolveInThen(this.resolve_success_value)
          if (isPromise(callbackPromiseOrData)) {
            callbackPromiseOrData.then((myresolve: ResolveType) => {
              resolve(callbackPromiseOrData.resolve_success_value);
            }, (error: any) => {
              reject(callbackPromiseOrData.reject_fail_value)
            })
          } else {
            resolve(callbackPromiseOrData)
          }
        })
        this.onRejectCallbacks.push(() => {
          callbackPromiseOrData = rejectInThen(this.reject_fail_value)
          if (isPromise(callbackPromiseOrData)) {
            setTimeout(() => {
              reject(callbackPromiseOrData)
            }, 100)
          } else {
            reject(callbackPromiseOrData)
          }
        })
      }
    })
  }
}

export const isObject = (val: any): val is Record<any, any> =>
  val !== null && typeof val === 'object'
export const isPromise = (val: any): val is Promise => {
  console.log("Promise方法判断，是否为Promise类型....");
  return isObject(val) && isFunction(val.then)
}
export const isFunction = (val: any): val is Function =>
  typeof val === 'function'


export { }
```

**2. 测试类实现**

```js
import Promise from './3promisethen课件版'
let fs = require('fs')
let promise1 = new Promise((resolve, reject) => {
  let result = __dirname + "/allfile/rootfile.txt"
  console.log("第一个Promise的同步区域");// S85
   setTimeout(() => {
    console.log("进入第一个setTimeout");
    resolve("setTimeout第一个Promise");
  }, 5)
})

let promise2 = new Promise((resolve, reject) => {
  let result = __dirname + "/allfile/rootfile.txt"
  console.log("第二个Promise的同步区域");// S85
  setTimeout(() => {
    console.log("进入第二个setTimeout");
    resolve("setTimeout第二个Promise");
  }, 5)
})



let promise3 = new Promise((resolve, reject) => {
  let result = __dirname + "/allfile/rootfile.txt"
  console.log("第三个Promise的同步区域");// S85
  setTimeout(() => {
    console.log("进入第三个setTimeout");
    resolve("setTimeout==第三个Promise");
  }, 5)
})

Promise.all([promise1, promise2, promise3]).then((resolveValue) => {
  console.log("Promise.all==>哈哈resolveValue:", resolveValue)
}, (rejectValue) => {
  console.log("Promise.all==>哈哈rejectValue:", rejectValue)
})


export { }
```

