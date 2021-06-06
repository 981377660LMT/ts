// 组合模式 Composite
// 特点：以树的形式展示对象的组合，并且可以以类似的方式处理每个枝点。
// 用处：当对象组合以树状存在，有父有子，并且对象的行为差不多时可以考虑组合模式，如菜单，游戏里的技能树。
// 注意：遍历组合的性能要求。

// 菜单可以包括子菜单，点击菜单项时有子菜单则显示子菜单，没有时触发点击事件。
// 扩展内建类
abstract class MenuBase extends Array<MenuBase> {
  abstract name: string

  abstract click(): void

  addChild(...childs: Array<MenuBase>) {
    childs.forEach(o => this.push(o))
  }
}

class MenuItem extends MenuBase {
  constructor(public name: string, private clickFunc?: () => string) {
    super()
  }

  click() {
    console.log(`click ${this.name}`)

    if (this.clickFunc) {
      console.log(this.clickFunc())
    }

    if (this.length > 0) {
      let childs = this.reduce((p, c) => <MenuBase>{ name: `${p.name},${c.name}` }).name
      console.log(`${this.name}'s childs: ${childs}`)
    }
  }
}

let root = new MenuItem('root')

let A1 = new MenuItem('A1')
let A2 = new MenuItem('A2', () => {
  return 'my name is A2'
})

let B1 = new MenuItem('B1')
let B2 = new MenuItem('B2', () => {
  return 'my name is B2'
})
let B3 = new MenuItem('B3', () => {
  return 'my name is B3'
})

root.push(A1, A2)

A1.push(B1, B2, B3)

root.click()
A1.click()
A2.click()
B1.click()

console.log(root, Array.isArray(root))

// 符合预期行为，这种组合就是非常简单的，但如果组合得非常深且枝非常多时就需要考虑查找枝时的效率问题了，
// 通常的办法是采用缓存来把一些常用的查找结果缓存起来，避免频繁遍历。
