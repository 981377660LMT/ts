type GetGetters<T> = {
  [P in keyof T]: T[P] extends (...arg: any[]) => infer R ? R : never
}
type OptionsType<S, G, A> = {
  id: string
  state: () => Readonly<S>
  getters: G & ThisType<GetGetters<G> & Readonly<S>>
  actions: A & ThisType<A & S>
}
declare function defineStore<S, G, A>(store: OptionsType<S, G, A>): A & Readonly<S> & GetGetters<G>

// 利用了函数泛型的推断
