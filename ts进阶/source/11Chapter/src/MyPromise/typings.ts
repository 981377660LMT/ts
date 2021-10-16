interface Executor<T> {
  (resolve: Resolve<T>, reject: Reject): void
}

interface Resolve<T> {
  (value: T): void
}

interface Reject {
  (reason?: any): void
}

type Status = 'pending' | 'onfulfilled' | 'onrejected'

export type { Executor, Resolve, Reject, Status }
