import { Food } from '../state'
// 模拟后端数据表的美食分类数据
export let foodList =
  [{ foodid: 1, shop: "陶然居", foodName: '400克泡椒鱼头', price: 15 },
  { foodid: 2, shop: "顶呱呱", foodName: '香辣哇哇火锅', price: 56 },
  { foodid: 3, shop: "韩正味", foodName: '石锅拌饭', price: 15 },
  { foodid: 4, shop: "成都小吃", foodName: '蚂蚁上树', price: 18 }]

// 扁平化后后端数据
function convertToRecord(foodRec: Record<any, Food> = {}) {
  foodList.map((food) => {
    foodRec[food.foodid] = food
  })
  return foodRec
}
export default convertToRecord()