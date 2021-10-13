import 'reflect-metadata'
import { Userinfo } from '../entity/UserInfo'
import Autowired from '../decorator/autowireddecortator'
import UserServiceImpl from '../service/UserServiceImpl'
import UserServiceInter from '../service/UserSerivceInter'
import CollectionInstance from '../collection'
import Singleton from '../decorator/singletondecorator'
class UserController {

  @Autowired("userServiceImpuserinfosdbl")//  修改Inject 为更专业的 Autowired 单词
  @Autowired("userServiceImpl")
  @Singleton(true)
  private userServiceImpl!: UserServiceInter // 修改Inject 为更专业的 Autowired 单词

  public login(): void {
    // 增加....
    //let userService: UserService = CollectionInstance.get("userService");
    //userService.register();
    let UserServiceImpl: UserServiceImpl =
      Reflect.getOwnPropertyDescriptor(UserController.prototype,
        "userServiceImpl").value//S100
    let userinfofrmdb: Userinfo = UserServiceImpl.Login("admin", "123");
    console.log(userinfofrmdb)
  }
}
let controller = new UserController();
controller.login();
export { }