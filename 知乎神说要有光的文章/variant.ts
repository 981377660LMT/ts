// unsafe
interface Bivariant<T> {
  call(x: T): void
}

// safe
interface Contravariant<T> {
  call: (x: T) => void
}

function guess<T extends any = unknown>(val1: T, val2: T): string {
  if (typeof val1 === 'string') {
    return val2 // error
  }

  return 'dunno'
}

type AmPm = 'Am' | 'Pm'

function ap<T extends AmPm>(val: T): T {
  if (val === 'Am') {
    return 'Am'
  }

  return 'Pm'
}

// !不要在回调中使用可选参数，除非你真的是故意的：
/* WRONG */
interface Fetcher {
  getObject(done: (data: any, elapsedTime?: number) => void): void
}
