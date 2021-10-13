import userinfosdb, { Userinfo } from '../entity/UserInfo'
import userinfoDaoImpl from '../dao/UserDaoImpl'
import UserDaoImpl from '../dao/UserDaoImpl';
export class UserServiceImpl {

  userinfoDaoImpl: UserDaoImpl = new UserDaoImpl();
  static userServiceImpl: UserServiceImpl
  static getInstance() {
    if (!this.userServiceImpl) {
      this.userServiceImpl = new UserServiceImpl();
    }
    return this.userServiceImpl
  }

  constructor() {
    console.log("UserServiceImpl构造器....");
  }
  updateUser() {

  }
  Login(username: string, pwd: string): Userinfo {
    console.log("进入service ...Login,username:", username)
    return this.userinfoDaoImpl.findUsrByUsm(username, pwd) || null
  }
  register() {
    //this.userinfoDaoImpl.findUsrByUsm(username, pwd) 
    console.log("我是usersevice...register")
  }
}