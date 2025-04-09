// https://stackoverflow.com/questions/56456641/how-to-fix-cannot-assign-to-partialthis-in-subclass-method
// !解决方法：用 Pick<S, K> 而不是 Partial<S>
// // We MUST keep setState() as a unified signature because it allows proper checking of the method return type.
// // See: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18365#issuecomment-351013257
// // Also, the ` | S` allows intellisense to not be dumbisense
// setState<K extends keyof S>(
//   state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
//   callback?: () => void
// ): void;

import React from 'react'

class BaseClass<S extends Record<string, any> = {}> {
  // updateState(state: Partial<S>) {}
  updateState<K extends keyof S>(state: Pick<S, K>) {}
}

interface IState {
  scrollLeft: number
  scrollTop: number
}

class SubClass1<K extends IState> extends BaseClass<K> {
  foo() {
    this.updateState({ scrollLeft: 0 }) // ok
  }
}

class SubClass2 extends SubClass1<IState & { v: number }> {
  override foo() {
    this.updateState({ v: 0 }) // ok
  }
}
