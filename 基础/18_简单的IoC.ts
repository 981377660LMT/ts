import 'reflect-metadata'

const Injectable = (): ClassDecorator => target => {}
type Constructor<T = {}> = new (...args: any[]) => T

class OtherService {
  a = 1
}

@Injectable()
class TestService {
  // 依赖注入
  constructor(public readonly otherService: OtherService) {}

  testMethod() {
    console.log(this.otherService.a)
  }
}

// IoC控制反转，将TestService类的控制权交给Factory容器管理，TestService类的依赖在容器里被实例化
const Factory = <T>(target: Constructor<T>): T => {
  // 获取所有注入的服务(获取类的构造函数的参数)
  const providers = Reflect.getMetadata('design:paramtypes', target) // [OtherService]
  console.log(providers)
  const args = providers.map((provider: Constructor) => new provider())
  console.log(args)
  return new target(...args)
}

Factory(TestService).testMethod() // 1
