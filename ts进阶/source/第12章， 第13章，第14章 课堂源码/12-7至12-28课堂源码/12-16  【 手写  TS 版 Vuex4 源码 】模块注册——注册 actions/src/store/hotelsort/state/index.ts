
// 酒店分类的类型
type HotelSort = { id: number, type: string }
// 酒店分类state的类型
interface HotelSortState {
  [key: string]: HotelSort
}
interface HotelSortListState {
  "hotelInfoList": HotelSortState
}
// 初始化所有美食state数据
let state: HotelSortListState = {
  "hotelInfoList": {
    0: { id: 0, type: "暂无酒店类型" }
  }
}

export { HotelSort, HotelSortState, HotelSortListState, state }


