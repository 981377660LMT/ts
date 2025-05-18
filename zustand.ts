type SetStateInternal<T> = {
  _(partial: T | Partial<T> | { _(state: T): T | Partial<T> }['_'], replace?: false): void
  _(state: T | { _(state: T): T }['_'], replace: true): void
}['_'] // bivarianceHack

interface StoreApi<T> {
  setState: SetStateInternal<T>
  getState: () => T
  getInitialState: () => T
  subscribe: (listener: (state: T, prevState: T) => void) => () => void
}

type ExtractState<S> = S extends { getState: () => infer T } ? T : never

type Get<T, K, F> = K extends keyof T ? T[K] : F // getOrDefault

// 把 Ms 里的每个 mutator 依次应用到 S 上，最终返回变换后的类型 S。
// 常用于类型安全地组合多个“状态变换器”。

type Mutate<S, Ms> = number extends Ms['length' & keyof Ms]
  ? S
  : Ms extends []
    ? S
    : Ms extends [[infer Mi, infer Ma], ...infer Mrs]
      ? Mutate<StoreMutators<S, Ma>[Mi & StoreMutatorIdentifier], Mrs>
      : never

// 用于定义 store 的初始化函数类型。
// 支持通过泛型参数 Mis/Mos 注入 mutator，类型安全地扩展 store 的能力。
type StateCreator<
  T,
  Mis extends [StoreMutatorIdentifier, unknown][] = [],
  Mos extends [StoreMutatorIdentifier, unknown][] = [],
  U = T
> = ((
  setState: Get<Mutate<StoreApi<T>, Mis>, 'setState', never>,
  getState: Get<Mutate<StoreApi<T>, Mis>, 'getState', never>,
  store: Mutate<StoreApi<T>, Mis>
) => U) & { $$storeMutators?: Mos }

// !预留接口，用于扩展 mutator 类型（如 middleware、devtools 等）
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-object-type
interface StoreMutators<S, A> {}
type StoreMutatorIdentifier = keyof StoreMutators<unknown, unknown>

// 支持两种调用方式：直接传初始化函数，或先柯里化再传初始化函数。
// 返回类型会根据 Mos 自动推断出扩展后的 store 类型。
type CreateStore = {
  <T, Mos extends [StoreMutatorIdentifier, unknown][] = []>(
    initializer: StateCreator<T, [], Mos>
  ): Mutate<StoreApi<T>, Mos>

  <T>(): <Mos extends [StoreMutatorIdentifier, unknown][] = []>(
    initializer: StateCreator<T, [], Mos>
  ) => Mutate<StoreApi<T>, Mos>
}

type CreateStoreImpl = <T, Mos extends [StoreMutatorIdentifier, unknown][] = []>(
  initializer: StateCreator<T, [], Mos>
) => Mutate<StoreApi<T>, Mos>

const createStoreImpl: CreateStoreImpl = createState => {
  type TState = ReturnType<typeof createState>
  type Listener = (state: TState, prevState: TState) => void
  let state: TState
  const listeners: Set<Listener> = new Set()

  const setState: StoreApi<TState>['setState'] = (partial, replace) => {
    // TODO: Remove type assertion once https://github.com/microsoft/TypeScript/issues/37663 is resolved
    // https://github.com/microsoft/TypeScript/issues/37663#issuecomment-759728342
    const nextState =
      typeof partial === 'function' ? (partial as (state: TState) => TState)(state) : partial
    if (!Object.is(nextState, state)) {
      const previousState = state
      state =
        (replace ?? (typeof nextState !== 'object' || nextState === null))
          ? (nextState as TState)
          : Object.assign({}, state, nextState)
      listeners.forEach(listener => listener(state, previousState))
    }
  }

  const getState: StoreApi<TState>['getState'] = () => state

  const getInitialState: StoreApi<TState>['getInitialState'] = () => initialState

  const subscribe: StoreApi<TState>['subscribe'] = listener => {
    listeners.add(listener)
    // Unsubscribe
    return () => listeners.delete(listener)
  }

  const api = { setState, getState, getInitialState, subscribe }
  const initialState = (state = createState(setState, getState, api))
  return api as any
}

const createStore = (createState =>
  createState ? createStoreImpl(createState) : createStoreImpl) as CreateStore

export {}
