import 'reflect-metadata'
import Autowired from '../decorator/autowireddecortator'
import UserServiceImpl from '../service/UserServiceImpl'
import UserServiceInter from '../service/UserSerivceInter'
import CollectionInstance from '../collection/'
// 10-21 【仿 Nestjs 装饰器实战】 依赖注入实现和升级自动装配装饰器
//  实现步骤   1. 建立伪接口类 UserServiceInter
//            2. 修改UserService的名字为userServiceImpl类
//            3. 修改自动装配装饰器【Autowired】代码:见增加和修改部分
//          最后别忘了修改UserController中的login方法中的S100中的属性名为userServiceImpl
class UserController {

  @Autowired("userServiceImpl")//  修改Inject 为更专业的 Autowired 单词
  private userServiceImpl!: UserServiceInter // 修改Inject 为更专业的 Autowired 单词

  public login(): void {
    // 增加....
    //let userService: UserService = CollectionInstance.get("userService");
    //userService.register();
    let UserServiceImpl: UserServiceImpl = Reflect.getOwnPropertyDescriptor(UserController.prototype,
      "userServiceImpl").value//S100
    UserServiceImpl.register();
  }
}
let controller = new UserController();
controller.login();
export { }