import 'reflect-metadata'
import Autowired from '../decorator/autowireddecortator'
import UserService from '../service/UserService'
import CollectionInstance from '../collection/'
// 装饰器执行顺序： 1.属性装饰器==>2.方法参数装饰器==>3.方法装饰器===>4.类装饰器
class UserController {

  @Autowired("userService")//  修改Inject 为更专业的 Autowired 单词
  private userService!: UserService // 修改Inject 为更专业的 Autowired 单词

  public login(): void {
    // 增加....
    //let userService: UserService = CollectionInstance.get("userService");
    //userService.register();
    let userService: UserService=Reflect.getOwnPropertyDescriptor(UserController.prototype,
      "userService").value
      userService.register(); 
  }
}
let controller = new UserController();
controller.login();
export { }