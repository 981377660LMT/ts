// 3 UserService业务类
export default class UserService {
  constructor(){
    console.log("UserService构造器")
  }
  pname: string = "人民"
  public login() {
    console.log(this.pname + "登录....");
  }
}