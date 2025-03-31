// https://stackoverflow.com/questions/56456641/how-to-fix-cannot-assign-to-partialthis-in-subclass-method
// 解决方法：
// 1. as 断言
// 2. 参数传一个类的类型.

class BaseClass<S extends Record<string, any> = {}> {
  updateState(state: Partial<S>) {}
}

interface IState {
  scrollLeft: number
}

class SubClass<K extends IState> extends BaseClass<K> {
  foo() {
    const state: Partial<K> = { scrollLeft: 0 } // 不能将类型“{ scrollLeft: 0; }”分配给类型“Partial<K>”。
    this.updateState(state)
  }
}

new SubClass().updateState({ scrollLeft: 0 }) // ok

class SubClass2 extends BaseClass<IState> {
  foo() {
    const state = { scrollLeft: 0 } // ok
    this.updateState(state)
  }
}

// 我们只知道 T 必须实现的最小接口，我们并不完全知道 T 的类型.
function partial<T extends { prop: number }>(): Partial<T> {
  return { prop: 1 } // 不能将类型“{ prop: 1; }”分配给类型“Partial<T>”。
}

// typescript 通常不允许我们在涉及类型参数的地方分配具体值（因为我们并不真正知道类型参数的最终形状）。
function getObj<T extends { prop: { name: string } }>(): Partial<T> {
  return { prop: { name: '' } } // still an error
}

var r = getObj<{ prop: { name: string; lastName: string } }>()
r.prop!.lastName // r should have last name, where is my lastName ?!
