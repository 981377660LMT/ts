export interface Listener<T> {
  (event: T): any
}

export interface Disposable {
  dispose: () => any
}

export class TypedEvent<T> {
  // 也可以按类型存为邻接表，且限制邻接表的长度
  private listeners: Listener<T>[] = []
  private listenersOncer: Listener<T>[] = []

  on(listener: Listener<T>): Disposable {
    this.listeners.push(listener)

    return {
      dispose: () => this.off(listener),
    }
  }

  once(listener: Listener<T>): void {
    this.listenersOncer.push(listener)
  }

  off(listener: Listener<T>) {
    this.listeners = this.listeners.filter(l => l !== listener)
  }

  emit(event: T) {
    this.listeners.forEach(listener => listener(event))

    this.listenersOncer.forEach(listener => listener(event))

    this.listenersOncer = []
  }
}
