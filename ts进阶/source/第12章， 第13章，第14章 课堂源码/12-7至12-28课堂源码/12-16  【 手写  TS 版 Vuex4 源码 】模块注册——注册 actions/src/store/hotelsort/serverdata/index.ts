// 模拟后端数据表的酒店分类数据"allFoodSortInfo":
import { HotelSort } from '../state'

let hotelSortList = [
  { id: 1, type: "经济型酒店" },
  { id: 2, type: "舒适三星酒店" },
  { id: 3, type: "高档四星酒店" },
  { id: 4, type: "豪华五星酒店" },
  { id: 5, type: "公寓" }]


function convertToRecord(hotelSortRec: Record<any, HotelSort> = {}) {
  hotelSortList.map((hotelSort) => {
    hotelSortRec[hotelSort.id] = hotelSort
  })
  return hotelSortRec
}
export default convertToRecord()