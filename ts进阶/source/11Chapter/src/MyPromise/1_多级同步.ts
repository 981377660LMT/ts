import type { Executor, Reject, Resolve, Status } from './typings'

class MyPromise<T = unknown> {
  private resolve: Resolve<T>
  private reject: Reject
  private status: Status
  private resolvedValue?: T
  private rejectedReason?: any

  constructor(executor: Executor<T>) {
    this.status = 'pending'
    this.resolve = (value: T) => {
      if (this.status === 'pending') {
        this.status = 'onfulfilled'
        this.resolvedValue = value
      }
    }

    this.reject = (reason?: any) => {
      if (this.status === 'pending') {
        this.status = 'onrejected'
        this.rejectedReason = reason
      }
    }

    // 执行中途出错
    try {
      executor(this.resolve, this.reject)
    } catch (error: any) {
      console.log('error', 789)
      this.status = 'pending'
      this.reject(error)
      throw new Error('程序停止...')
    }
  }

  then(onfulfilled?: Resolve<T>, onrejected?: Reject): MyPromise<T> {
    return new MyPromise<T>((resolve, reject) => {
      let result: any // 这一个promise的结果
      if (this.status === 'onfulfilled') {
        if (onfulfilled) {
          result = onfulfilled(this.resolvedValue!)
          resolve(result)
        }
      } else if (this.status === 'onrejected') {
        if (onrejected) {
          result = onrejected(this.rejectedReason)
          reject(result)
        }
      } else {
        // 同步不用管
      }
    })
  }

  catch(onrejected?: Reject): MyPromise<T> {
    return this.then(undefined, onrejected)
  }
}

if (require.main === module) {
  const promise = new MyPromise<string>((resolve, reject) => {
    reject('no')
    resolve('ok')
  }).then(
    data => {
      console.log(data)
      return data
    },
    err => console.log(err)
  )
  // .catch(err => console.log(err))
}

// new Promise<void>((resolve, reject) => {
//   // resolve()
//   reject('no')
// })
//   .then(data => console.log(data))
//   .catch(err => console.log(err))

// 1.防止resolve中途出错
// 2.同步级联then
