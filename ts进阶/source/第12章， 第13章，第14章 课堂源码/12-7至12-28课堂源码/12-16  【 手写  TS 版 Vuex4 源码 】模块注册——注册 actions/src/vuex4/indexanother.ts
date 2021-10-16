
import { App, inject } from 'vue'
const injectKey = "store"
export function useStore<S>(): Store<S> {
  return inject(injectKey) as any
}
export function createStore<S>(options: StoreOptions<S>) {
  return new Store<S>(options)
}

class Store<S = any>{
  constructor(options: StoreOptions<S>) {
    console.log("options:", options)
  }
  install(app: App) {
    app.provide(injectKey, this)
  }
  test() {
    return "我是store";
  }
}

interface StoreOptions<S> {
  state?: S;
  getters?: GetterTree<S, S>;
  mutations?: MutationTree<S>;
  actions?: ActionTree<S, S>
}
// ActionContext
interface ActionContext<S, R> {
  dispatch: Dispatch;
  commit: Commit;
  state: S;
}
type Dispatch = (type: string, payload?: any) => any
type Commit = (type: string, payload?: any) => any
// ActionTree
interface ActionTree<S, R> {
  [key: string]: Action<S, R>
}
type Action<S, R> = (context: ActionContext<S, R>, payload?: any) => any
// MutationTree
interface MutationTree<S> {
  [key: string]: Mutation<S>
}
type Mutation<S> = (state: S, payload?: any) => void
// GetterTree
interface GetterTree<S, R> {
  [key: string]: Getter<S, R>
}

type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any
