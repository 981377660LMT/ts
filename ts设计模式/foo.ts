const a_ = 1 as {}
/////////////////////////////////////////
interface ClockInterface {
  currentTime: Date
  setTime(d: Date): void
}

interface ClockConstructor<T> {
  new (hour: number, minute: number): T
}

class Clock implements ClockInterface {
  currentTime: Date = new Date()
  // 接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。
  // 并且只对其实例部分进行类型检查。
  // constructor 存在于类的静态部分，所以不在检查的范围内。
  private setTime(d: Date) {
    this.currentTime = d
  }

  constructor(h: number, m: number) {}
}

export { Clock }
////////////////////////////////////////////
function create<T>(c: { new (): T }): T {
  return new c()
}
//////////////////////////////////////
let pythonic: [boolean, ...string[], number]
pythonic = [true, 'a', 'b', 1]

///////////////////////////////////
declare function doSomething(...args: [...string[], boolean]): void {}

doSomething(false)
doSomething('a', 'b', true)
///////////////////////////////////////
