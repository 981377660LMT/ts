import { createStore } from '@/vuex4/indexanother'
import { RootState } from './rootstate'
import { foodSortModule, hotelSortModule } from './modulecollection'

export default createStore({
  state: {
    navList: ['这是一个单模块的测试state', 'ok'],
  },
  getters: {
    showNavList(state) {
      return state.navList
    },
  },
  mutations: {
    findNavList(state, navList) {
      return (state.navList = navList)
    },
  },
  actions: {
    findNavList({ commit }) {
      setTimeout(() => {
        let navList = ['abc', 'bc']
        commit('findNavList', navList)
      })
    },
  },
})
