//  下面是一个说明依赖注入带来的好处的不错的经典案例,没有实现具体功能
//  本讲理解原理即可，后面实战环节会运用依赖注入

//  依赖注入-- 创建和使用分离
class InkPrint { // 喷墨打印机

  paper: Paper = new B5Paper();
  ink: GrayInk = new GrayInk();

  print() {

  }

}
