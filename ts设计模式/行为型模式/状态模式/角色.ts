// 状态模式 State
// 特点：通过状态来改变对象的行为。
// 用处：当对象的行为取决于它的状态或者有很多if else之类的是由状态控制的时候可以考虑状态模式，如常见的状态机。
// 注意：状态是由谁来转换。
// 下面用TypeScript简单实现一下状态模式： 大家都玩过游戏，控制游戏的主角时鼠标左键可以是移动，遇到怪时点击左键是攻击，遇到NPC时是对话。 下面就以这点简单实现个状态模式：

// 角色和状态的接口，状态只需要处理当前状态需要做的事：
interface Role {
  name: string

  click(): void
  changeState(state: State): void
}

interface State {
  handle(role: Role): void
}

class Player implements Role {
  private state!: State
  constructor(public name: string) {}

  click() {
    if (this.state) {
      this.state.handle(this)
    }
  }

  changeState(state: State) {
    this.state = state
    console.log(`change to ${this.state.constructor.name}`)
  }
}
// 状态的具体实现，分为移动状态，攻击状态，对话状态：
class MoveState implements State {
  static readonly instance = new MoveState()
  private constructor() {}

  handle(role: Role) {
    console.log(`${role.name} is moving`)
  }
}

class AttackState implements State {
  static readonly instance = new AttackState()
  private constructor() {}

  handle(role: Role) {
    console.log(`${role.name} is attacking`)
  }
}

class TalkState implements State {
  static readonly instance = new TalkState()
  private constructor() {}

  handle(role: Role) {
    console.log(`${role.name} is talking`)
  }
}

let player = new Player('brook')
player.changeState(MoveState.instance)
player.click()

player.changeState(AttackState.instance)
player.click()

player.changeState(TalkState.instance)
player.click()

// 这样随着状态的变化，点击左键做不同的事。 对于由谁来驱动状态变化可以根据实际情况来考虑，
// 简单的话直接放角色里面就行，由角色自己决定自己的状态，复杂的话可以考虑用表来驱动状态机，通过表过实现状态的跳转。
