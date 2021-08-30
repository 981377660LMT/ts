// 状态定义/转移/方法
class Context {
  private state!: State

  constructor(state: State) {
    this.switchTo(state)
  }

  public switchTo(state: State): void {
    console.log(`Context: Transition to ${(<any>state).constructor.name}.`)
    this.state = state
    this.state.setContext(this)
  }

  public request1(): void {
    this.state.handle1()
  }

  public request2(): void {
    this.state.handle2()
  }
}

abstract class State {
  protected context!: Context

  public setContext(context: Context) {
    this.context = context
  }

  public abstract handle1(): void

  public abstract handle2(): void
}

class ConcreteStateA extends State {
  public handle1(): void {
    console.log('ConcreteStateA handles request1.')
    console.log('ConcreteStateA wants to change the state of the context.')
    this.context.switchTo(new ConcreteStateB())
  }

  public handle2(): void {
    console.log('ConcreteStateA handles request2.')
  }
}

class ConcreteStateB extends State {
  public handle1(): void {
    console.log('ConcreteStateB handles request1.')
  }

  public handle2(): void {
    console.log('ConcreteStateB handles request2.')
    console.log('ConcreteStateB wants to change the state of the context.')
    this.context.switchTo(new ConcreteStateA())
  }
}

const context = new Context(new ConcreteStateA())
context.request1()
context.request2()

export {}
