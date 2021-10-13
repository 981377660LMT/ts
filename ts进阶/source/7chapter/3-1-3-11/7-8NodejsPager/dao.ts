import { Food, Customer } from './entity'
import ArrayList from './ArrayList'
// 美食DAO类
export class FoodDao {
  arrayListFood!: ArrayList<Food>

  // 初始化数据-模拟数据表的数据
  init() {
    let foodFish = new Food("F100", "十八碗", "400克泡椒鱼头");
    let foodChafing = new Food("F101", "顶呱呱", "香辣哇哇火锅");
    let foodDatong = new Food("F102", "肯德基", "大桶炸鸡");
    let foodFour = new Food("F103", "麦当劳", "冰淇凌");
    let foodFive = new Food("F104", "华莱士", "冰淇凌2");
    let foodSix = new Food("F105", "成都小吃", "蚂蚁上树");
    let foodSeven = new Food("F106", "郭林家常菜", "大乱炖");
    let foodEight = new Food("F107", "韩正味", "石锅拌饭");
    this.arrayListFood = new ArrayList<Food>();
    this.arrayListFood.add(foodFish);
    this.arrayListFood.add(foodChafing);
    this.arrayListFood.add(foodDatong);
    this.arrayListFood.add(foodFour);
    this.arrayListFood.add(foodFive);
    this.arrayListFood.add(foodSix);
    this.arrayListFood.add(foodSeven);
    this.arrayListFood.add(foodEight);
    
    return this.arrayListFood
  }

  // Dao类中的查询所有美食的方法
  findAllFoods() {
    return this.init();
  }
  // Service
  // findFoodsByShop()
  // deleteShopFood
}


// 顾客数据访问类
export class CustomerDao {
  public arrayListFood: ArrayList
  constructor() {
    this.arrayListFood = new ArrayList();
  }
  // 模拟后端数据表中数据....
  init() {
    let baiyanSong = new Customer("白岩松", 50);
    let sunwukong = new Customer("孙悟空", 500);
    let siteng = new Customer("司腾", 40);
    let zhouxingchi = new Customer("周星驰", 55);
    let zhengchengGong = new Customer("郑成功", 657);
    let chenZhen = new Customer("陈真", 135);
    let biergici = new Customer("比尔盖茨", 55);
    let guodegang = new Customer("郭德纲", 48);
    this.arrayListFood.add(baiyanSong)
    this.arrayListFood.add(sunwukong)
    this.arrayListFood.add(siteng)
    this.arrayListFood.add(zhouxingchi)
    this.arrayListFood.add(zhengchengGong);
    this.arrayListFood.add(chenZhen);
    this.arrayListFood.add(biergici);
    this.arrayListFood.add(guodegang);
    return this.arrayListFood
  }
  // 模拟从后端数据表中取数据....
  getAllCustomerFromDB() {

    return this.init();
  }

}





