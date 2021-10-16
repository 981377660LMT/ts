import UserServiceImpl from './UserServiceImpl';


// 伪接口
export default class UserServiceInter {//作用同10-18的Paper

  public static getServiceImplClass() {
    return UserServiceImpl;
  }

}


