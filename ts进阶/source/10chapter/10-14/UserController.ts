
import { InjectContructor } from './InjectContructorDecorator'
import UserService from './UserService'
import collectionInstance from './Collection'
class UserController {
  // 依赖注入
  constructor(@InjectContructor("userService")
  private userService?: UserService, private count?: string) {

  }

  public login() {
    let peopleServiceInstace = collectionInstance.get("userService");
    peopleServiceInstace.login();
  }
}
let controller = new UserController();
controller.login();