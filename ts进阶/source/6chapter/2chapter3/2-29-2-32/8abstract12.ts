interface MouseListenerProcess {
  mouseReleased(e: any): void//  鼠标按钮在组件上释放时调用。
  mousePressed(e: any): void//  鼠标按键在组件上按下时调用。
  mouseEntered(e: any): void //鼠标进入到组件上时调用。

  mouseClicked(e: any): void// 鼠标按键在组件上单击（按下并释放）时调用。
  mouseExited(e: any): void//  鼠标离开组件时调用。
}
// 适配器Adapter是一个抽象类
abstract class MouseListenerProcessAdapter implements MouseListenerProcess {
  mouseReleased(e: any): void {
    throw new Error('Method not implemented.');
  }
  mousePressed(e: any): void {
    throw new Error('Method not implemented.');
  }
  mouseEntered(e: any): void {
    throw new Error('Method not implemented.');
  }
  abstract mouseClicked(e: any): void;

  abstract mouseExited(e: any): void;

}

class MyMouseListenerProcess extends MouseListenerProcessAdapter {
  mouseClicked(e: any): void {
    throw new Error('Method not implemented.');
  }
  mouseExited(e: any): void {
    throw new Error('Method not implemented.');
  }


}