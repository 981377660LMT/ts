abstract class CaffeineBeverage {
  constructor() {
    // 冲泡流程
    this.boilWater()
    this.brew() // 统一后的方法
    this.pourInCup()
    this.addCondiments() // 统一后的方法
  }
  abstract brew(): void // 制作
  abstract addCondiments(): void // 加工
  public boilWater() {
    // 煮沸水
    console.log('煮沸水')
  }
  public pourInCup() {
    // 把茶倒进杯子
    console.log('倒进杯子')
  }
}

class Coffee extends CaffeineBeverage {
  public brew() {
    console.log('冲泡咖啡')
  }
  public addCondiments() {
    console.log('加糖和牛奶')
  }
}
class Tea extends CaffeineBeverage {
  public brew() {
    console.log('用沸水浸泡茶叶')
  }
  public addCondiments() {
    console.log('加柠檬')
  }
}

export {}
