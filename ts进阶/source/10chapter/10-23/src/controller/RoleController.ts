import Autowired from '../decorator/autowireddecortator'
import UserServiceImpl from '../service/UserServiceImpl'
import UserServiceInter from '../service/UserSerivceInter'
import CollectionInstance from '../collection/'
class RoleController {

  @Autowired("userServiceImpl", false)//  修改Inject 为更专业的 Autowired 单词
  @Autowired("userServiceImpl", false)
  private userServiceImpl!: UserServiceInter

}