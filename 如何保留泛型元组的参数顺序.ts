// https://github.com/981377660LMT/ts/issues/831

type DependencyList = readonly unknown[]

type Effect<T extends DependencyList> = (
  changes?: number[],
  previousDeps?: T,
  currentDeps?: T
) => void | (() => void)

// 为什么 deps 改成 T ，无法保留元组参数顺序
declare const useTrackedEffect: <T extends DependencyList>(effect: Effect<T>, deps?: [...T]) => void

useTrackedEffect((changes, previousDeps, currentDeps) => {}, [1, '2', true])

export {}
