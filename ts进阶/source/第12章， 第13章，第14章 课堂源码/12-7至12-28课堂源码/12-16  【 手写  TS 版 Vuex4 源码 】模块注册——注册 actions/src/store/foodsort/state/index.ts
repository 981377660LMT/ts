
// 酒店分类的类型
type FoodSort = { id: number, type: string }
// 美食分类state的类型
interface FoodSortState {
  [key: string]: FoodSort
}

interface FoodSortListState {
  "foodSortInfoList": FoodSortState
}

// 初始化所有美食state数据
let state: FoodSortListState = {
  "foodSortInfoList": {
    0: { id: 0, type: "暂无美食类型" }
  }
}


export { FoodSort, FoodSortState, state, FoodSortListState }

