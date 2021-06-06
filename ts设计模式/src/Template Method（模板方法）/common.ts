// �������
class Component {
    // ģ�巽�����������Ⱦ�����̶����
    setup() {
      this.componentWillMount();
      this.doRender();
      this.componentDidMount();
    }
    private doRender() {
      // ��ʵ�ʵ���Ⱦ����
    }
    componentWillMount() {}
    componentDidMount() {}
  }
  
  class ComponentA extends Component {
    componentWillMount() {
      console.log('A�����������Ⱦ');
    }
    componentDidMount() {
      console.log('A�����Ⱦ���');
    }
  }
  
  class ComponentB extends Component {
    componentWillMount() {
      console.log('B�����������Ⱦ');
    }
    componentDidMount() {
      console.log('B�����Ⱦ���');
    }
  }
  

class Client {
    public static main(): void {
        const compA = new ComponentA();
        compA.setup();
      
        const compB = new ComponentB();
        compB.setup();
    }
}
Client.main()

// A�����������Ⱦ
// A�����Ⱦ���
// B�����������Ⱦ
// B�����Ⱦ���