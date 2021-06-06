// 适配器模式 Adapter
// 特点：把类或接口转换成另一个接口以便系统调用。
// 用处：当系统需要引入多个功能类并且这些功能的接口不统一时可以考虑用适配器模式把它们转成统一的接口，现实中的例子很多，比如充电器接口适配器。
// 注意：分为对象适配器和类适配器。

// 适配器模式的目的主要在于解决接口兼容性。
// 假定现在项目已经在用一个画图接口Graph以及它的实现Canvas2D：
interface Graph {
  drawLine(): void
  drawPie(): void
}

class Canvas2D implements Graph {
  drawLine() {
    console.log('draw 2d line')
  }
  drawPie() {
    console.log('draw 2d pie')
  }
}

// 项目升级需要提高UI美观，引入3D画图库Canvas3D，两者接口不一样：
class Canvas3D {
  draw3DLine() {
    console.log('draw 3d line')
  }

  draw3DPie() {
    console.log('draw 3d pie')
  }
}

// 项目是依赖接口Graph的，如果要直接加上3d功能就需要改接口，这个代价比较大，这时适配器派上用场：
class Canvas3DAdapter implements Graph {
  private canvas3D = new Canvas3D()

  drawLine() {
    this.canvas3D.draw3DLine()
  }

  drawPie() {
    this.canvas3D.draw3DPie()
  }
}

let canvas2D: Graph = new Canvas2D()
canvas2D.drawLine()
canvas2D.drawPie()

let canvas3D: Graph = new Canvas3DAdapter()
canvas3D.drawLine()
canvas3D.drawPie()
// 在Canvas3DAdapter里引入了Canvas3D对象，可以看出这是对象上的行为适配，所以叫对象适配器。
// 另外还有一种叫类适配器，使用多重继承来使新的适配类继承原来接口并且拥有两个类的功能，
// 在TypeScript里虽然不能用多重继承，但是可以用mixins方式强行加起来，这里就不写例子了。
