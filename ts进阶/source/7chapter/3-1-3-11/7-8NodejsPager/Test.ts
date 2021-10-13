import Pager from './Pager'
import { FoodDao } from './dao'
import { Food } from './entity'

// 创建分页对象，传递前端页面用户确定的页数。
let pager = new Pager<Food>(1)// 查询第3页的美食信息
let foodDao = new FoodDao();// 美食Dao
let allFoods = foodDao.findAllFoods();// 所有的美食
pager.dataList = allFoods;// 所有美食数据保存到Pager对象中
//console.log(pager.showCurrentPageData());//输出当前页的美食信息
//let curPageFood = pager.showCurrentPageDatcusta();
//Array<Food>=Food[]
pager.showCurrentPageData().forEach((food) => {
  console.log("food:", food.foodName)
})


