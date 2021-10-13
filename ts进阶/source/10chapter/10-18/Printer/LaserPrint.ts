//  下面是一个说明依赖注入带来的好处的不错的经典案例,没有实现具体功能
//  本讲理解原理即可，后面实战环节会运用依赖注入
class LaserPrint { // 激光打印机

  paper: A4Paper = new A3Paper();

  print() {

  }

}

// 扩展性差