export default class UserServiceImpl {

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
  Login(username: string, pwd: string, role: string) {
    console.log("进入service ...Login,username:", username)

    if (username === "admin" && pwd === "123" && role === "admin") {
      return true;
    } else {
      return false;
    }
  }
  register() {
    console.log("usersevice...register")
  }
}