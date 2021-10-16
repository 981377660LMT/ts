import { createStore } from '@/vuex4/index12-16'
import { foodSortModule, hotelSortModule } from './modulecollection'
import { RootState } from './rootstate'

export default createStore<RootState>({
  state: {
    navList: [10, 30, 40],
  },
  modules: {
    foodSortModule: foodSortModule,
    hotelSortModule: hotelSortModule,
  },
})
