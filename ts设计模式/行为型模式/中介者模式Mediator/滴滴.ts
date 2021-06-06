// 特点：为减少对象间的互相引用而引入的一个中介对象，用来来封装一系列对象的互相操作。
// 用处：当多个对象间需要互相引用且互相频繁操作时可以考虑中介者模式，如MVC里的Controller。

// 先定义用户, 车主和中介者接口： 用户的行为是叫车，车主是接送，中介者则需要维护用户和车主列表并且知道车的状态和提供叫车服务。

interface Client {
  getTaxi(): void
  pay(): void
}

interface Car {
  isWorking: boolean

  startWork(): void
  finishWork(): void
}

interface Mediator {
  registerClient(client: Client): void
  registerCar(car: Car): void

  getCar(): Car
  pay(car: Car): void
  updateCarStatus(car: Car): void
}

class User implements Client {
  taxi!: Car
  constructor(private readonly mediator: Mediator) {
    this.mediator.registerClient(this)
  }

  getTaxi() {
    this.taxi = this.mediator.getCar()
    if (this.taxi) {
      console.log('车来了')
    } else {
      console.log('没叫到车')
    }
  }

  pay() {
    this.mediator.pay(this.taxi)
    console.log('付款')
  }
}

class Taxi implements Car {
  isWorking: boolean = false

  constructor(private mediator: Mediator) {
    this.mediator.registerCar(this)
  }

  startWork() {
    console.log('有人叫车')
    this.isWorking = true
    this.mediator.updateCarStatus(this)
  }

  finishWork() {
    console.log('送完这趟了')
    this.isWorking = false
    this.mediator.updateCarStatus(this)
  }
}

class DiDi implements Mediator {
  private clientList: Array<Client> = []
  private carList: Array<Car> = []

  registerClient(client: Client) {
    this.clientList.push(client)
  }

  registerCar(car: Car) {
    this.carList.push(car)
  }

  getCar(): Car {
    let car = this.carList.find(o => !o.isWorking)
    car && car.startWork()
    //@ts-ignore
    return car
  }

  pay(car: Car) {
    car.finishWork()
  }

  updateCarStatus(car: Car) {
    console.log(`车子状态：${car.isWorking ? '工作' : '闲置'}`)
  }
}

let didi = new DiDi()
let taxi = new Taxi(didi)
let user = new User(didi)
user.getTaxi()
user.pay()

// 用户不需要管车，车子也不用管用户
// 这就是中介者模式的作用，逻辑都在自己这里

export {}
