import { Module } from '@/vuex4/index12-16'
import { RootState } from '@/store/rootstate'
import { state, FoodStateListState } from './state'
import { Types } from './type'
import foodRec from './serverdata'
export let foodModule: Module<FoodStateListState, RootState> = {
  namespaced: true,
  state,
  getters: {
    getFoodList(state) {
      return state.foodInfoList
    }
  },
  mutations: {
    [Types.FindFoodList](state, allfood) {
      state.foodInfoList = allfood
    }
  },
  actions: {
    [Types.FindFoodList]({ commit }) {
      setTimeout(() => {
        commit(Types.FindFoodList, foodRec)
      })
    }
  }
}

