
import store from '@/store'
import { FoodSortListState } from '../state'

type foodSortModuleGetters = {
  "foodSortModule/getFoodSortList": (state: FoodSortListState) => void;
}


function getFoodSortModuleGetters() {
  return (store as any).getters as foodSortModuleGetters
}

export default getFoodSortModuleGetters()
