import { Inject } from './injectdecortator'
import { UserService } from './UserService'
import CollectionInstance from './Collection'
import Controller from './ControllerDecorator'
import { get } from './methoddecorator'
// 装饰器执行顺序： 1.属性装饰器==>2.方法参数装饰器==>3.方法装饰器===>4.类装饰器
@Controller("/")
class UserController {

  @Inject("userService")
  private userService!: UserService

  @get("/login")
  public login(): void {
    //let peopleServiceInstace = CollectionInstance.get("userService");
    //peopleServiceInstace.login();
  }
}
let controller = new UserController();
controller.login();
export { }