// 特点：定义了对象间的一对多关系，当对象状态改变时，其他订阅了这个对象的对象就会收到通知。
// 用处：当一个对象状态的改变时需要其他对象也做出响应时可以考虑观察者模式，如网络聊天里的群。
// 群里的每个人都是注册到群里的对象，任何一个人发了信息其他人都能收到。
// 先定义群和群用户的接口： 群需要知道有哪些用户注册进来了，并且在有人发消息时去通知所有注册的人。 用户则需要发送消息和接收消息。

// observer是观察者,subject主题是被观察的对象,它持有许多观察者，可以动态的添加删除观察者，以及通知观察者自身的变化。
interface Observer {
  name: string

  sendMsg(msg: string): void
  receiveMsg(sender: Observer, msg: string): void
}

interface Subject {
  register(observer: Observer): void
  unregister(observer: Observer): void
  sendMsg(sender: Observer, msg: string): void
}

// 用户的名字和群
class User implements Observer {
  constructor(public name: string, private subject: Subject) {
    this.subject.register(this)
  }

  sendMsg(msg: string) {
    console.log(`${this.name} 发送 ${msg}`)
    this.subject.sendMsg(this, msg)
  }

  receiveMsg(sender: Observer, msg: string) {
    console.log(`${this.name} 收到来自${sender.name}的消息： ${msg} `)
  }
}

class Group implements Subject {
  private userList: Array<Observer> = []

  constructor(observer?: Observer) {
    observer && this.userList.push(observer)
  }

  unregister(observer: Observer) {
    const index = this.userList.indexOf(observer)
    if (index > -1) {
      this.userList.splice(index, 1)
    }
  }

  register(observer: Observer) {
    this.userList.push(observer)
  }

  sendMsg(sender: Observer, msg: string) {
    console.log(`群收到${sender.name}发信息：${msg}，通知所有人`)
    this.notify(sender, msg)
  }

  private notify(sender: Observer, msg: string) {
    this.userList.forEach(user => user.receiveMsg(sender, msg))
  }
}

let group = new Group()
let jim = new User('jim', group)
let brook = new User('brook', group)
let lucy = new User('lucy', group)

jim.sendMsg('hello')
lucy.sendMsg('well done!')

export {}
