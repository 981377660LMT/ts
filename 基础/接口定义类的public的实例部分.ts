interface IModuleMenuItem {
  // name: string
  // age: string
  // foo: string
  bar: () => void
}
class ModuleMenuItem implements IModuleMenuItem {
  private name: string
  protected age: string
  public foo: string

  static bar() {}
  // bar() {}
}
// 类“ModuleMenuItem”错误实现接口“IModuleMenuItem”。
//   属性“name”在类型“ModuleMenuItem”中是私有属性，但在类型“IModuleMenuItem”中不是。
// 类“ModuleMenuItem”错误实现接口“IModuleMenuItem”。
//   类型 "ModuleMenuItem" 中缺少属性 "bar"，但类型 "IModuleMenuItem" 中需要该属性。ts(2420)
export {}

// 接口只能定义类的public的实例字段
// construtor属于静态，因此类无法通过实现接口约束构造函数
// 只能将类声明成接口
