import { Module } from '@/vuex4/index12-16'
//import { Module } from 'vuex'
import { RootState } from '@/store/rootstate'
import { HotelSortListState, state } from './state'
import { Types } from './type'
import hotelSortRec from './serverdata'
export const hotelSortModule: Module<HotelSortListState, RootState> = {
  namespaced: true,
  state,
  getters: {
    getHotelSortList(state) {
      return state.hotelInfoList
    }
  },
  mutations: {
    [Types.FindHotelSortList](state, allHotelSort) {
      state.hotelInfoList = allHotelSort
    }
  },
  actions: {
    [Types.FindHotelSortList]({ commit }) {
      setTimeout(() => {
        commit(Types.FindHotelSortList, hotelSortRec)
      }, 5)
    }
  }
}