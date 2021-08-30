class Component {
  setup() {
    this.componentWillMount()
    this.doRender()
    this.componentDidMount()
  }
  private doRender() {
    // ...
  }
  componentWillMount() {}
  componentDidMount() {}
}

class ComponentA extends Component {
  componentWillMount() {
    console.log('1111')
  }
  componentDidMount() {
    console.log('222')
  }
}

class ComponentB extends Component {
  componentWillMount() {
    console.log('333')
  }
  componentDidMount() {
    console.log('444')
  }
}

class Client {
  public static main(): void {
    const compA = new ComponentA()
    compA.setup()

    const compB = new ComponentB()
    compB.setup()
  }
}

Client.main()

export {}
