// 「混合」是一个函数：

// 传入一个构造函数；
// 创建一个带有新功能，并且扩展构造函数的新类；
// 返回这个新类。

// 添加属性和方法的混合例子

type Constructor<T = {}> = new (...args: any[]) => T

const Activatable = <TBase extends Constructor>(Base: TBase) => {
  return class extends Base {
    // 在这里面扩充类的属性和方法
    isActivated = false

    activate() {
      this.isActivated = true
    }

    deactivate() {
      this.isActivated = false
    }
  }
}

class User {
  name = ''
}

const activatableUser = new (Activatable(User))()
