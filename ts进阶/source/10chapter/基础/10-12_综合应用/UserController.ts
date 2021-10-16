import CollectionInstance from './Collection'
import Controller from './ControllerDecorator'
import { Inject } from './injectdecortator'
import { UserService } from './UserService'
import { get } from './methoddecorator'

// 装饰器执行顺序： 1.属性装饰器==>2.方法参数装饰器==>3.方法装饰器===>4.类装饰器
@Controller('/')
class UserController {
  @Inject('userService') // 依赖注入：创建和使用分离
  private userService!: UserService

  constructor() {
    console.log('UserController构造器函数....')
  }

  @get('/login')
  public login(): void {
    const peopleServiceInstace = CollectionInstance.get('userService')
    peopleServiceInstace.login()
  }
}

const controller = new UserController()
// controller.login()

export {}
