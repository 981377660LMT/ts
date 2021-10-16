export interface GetterTree<S = any, R = any> {
  [key: string]: Getter<S, R>;
}
export type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any;

let getters: GetterTree = {
  getFoodSortList() {
    return "getter"
  }
}

type foodSortModuleGetters = {
  "getFoodSortList": () => void
}

console.log((getters as foodSortModuleGetters).getFoodSortList());

export { }

