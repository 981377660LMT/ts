import { FoodSort } from '../state'
// 模拟后端数据表的美食分类数据
export let foodSortList =
  [{ id: 1, type: '西餐' },
  { id: 2, type: '东北菜' },
  { id: 3, type: '云贵菜' }]

function convertToRecord(foodSortRec: Record<any, FoodSort> = {}) {
  foodSortList.map((foodSort) => {
    foodSortRec[foodSort.id] = foodSort
  })
  return foodSortRec
}
export default convertToRecord()