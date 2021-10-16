// 美食
type Food = {
  foodid: number, shop: string, foodName: string, price: number
}
interface FoodState {
  [key: string]: Food
}

interface FoodStateListState {
  "foodInfoList": FoodState
}

const state: FoodStateListState = {
  "foodInfoList": {
    0: {
      foodid: 1, shop: "暂无店铺",
      foodName: "暂无食品", price: 0
    }
  }
}

export { Food, FoodState, FoodStateListState, state }
