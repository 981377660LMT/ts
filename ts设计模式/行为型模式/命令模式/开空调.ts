// 在软件系统中，行为请求者与行为实现者通常是一种紧耦合的关系，
// 但某些场合，比如需要对行为进行记录、撤销或重做、事务等处理时，
// 这种无法抵御变化的紧耦合的设计就不太合适。\

// 需要定义三个角色：
// 1、received 真正的命令执行对象
// 2、Command 命令
// 3、invoker 使用命令对象的入口

// 用户用遥控器(invoker,具有Command)开灯(received)

interface Command {
  // 命令接口
  execute(): void
}
interface Light {
  // 灯这个设备具有 开灯这个方法
  on(): void
  off(): void
}
class LivingRoomLight implements Light {
  // 客厅的灯
  public on() {
    console.log('开灯')
  }
  public off() {
    console.log('关灯')
  }
}
class LightOnCommand implements Command {
  // 实现一个开灯的命令
  private light: Light
  constructor(light: Light) {
    this.light = light
  }
  public setLight(light: Light) {
    // 设置一个要开的灯比方说厨房的灯，或者也可以是客厅的灯
    this.light = light
  }
  public execute() {
    this.light.on()
  }
}

// invoker 使用命令对象的入口 (遥控器)
// 遥控器内持有一个命令插槽可以插入任何命令
// 当按钮按下时便会让命令执行
class SimpleRemoteControl {
  public slot!: Command
  public setCommand(command: Command) {
    // 这个方法用来设置插槽控制的命令
    this.slot = command
  }
  public buttonWasPressed() {
    // 当按钮按下时这个方法就会被调用
    this.slot.execute() // 使用当前命令衔接插槽，并调用它的 execute 方法
  }
}
// 我们还需要一个会使用命令模式(遥控器)的用户
class User {
  // 这是一个使用命令模式的客户
  public openLightWithControl(light: Light, remoteControl: SimpleRemoteControl) {
    // 它使用遥控器开灯
    // 生成将灯打开的命令
    let command = new LightOnCommand(light) // 生成一个打开客厅灯的命令
    // 然后将命令注入遥控器
    remoteControl.setCommand(command)
    // 按下遥控器的开关执行这个命令
    remoteControl.buttonWasPressed() // 这样就可以执行任何命令了
  }
}
// 新建遥控器
let remoteControl = new SimpleRemoteControl()
// 新建灯
let light = new LivingRoomLight()
// 新建用户
let user = new User()

user.openLightWithControl(light, remoteControl) // 用遥控器开灯
export {}
