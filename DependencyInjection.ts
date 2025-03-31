interface ServiceA {
  doA(): void
}

interface ServiceB {
  doB(): void
}

interface Dependencies {
  serviceA: ServiceA
  serviceB: ServiceB
}

class Application<D extends Dependencies> {
  // eslint-disable-next-line no-useless-constructor
  constructor(private deps: D) {}

  run() {
    this.deps.serviceA.doA()
    this.deps.serviceB.doB()
  }
}

const app = new Application({
  serviceA: { doA: () => console.log('A') },
  serviceB: { doB: () => console.log('B') }
})

app.run() // 输出: A B

export {}
