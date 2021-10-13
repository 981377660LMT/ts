// 6 业务逻辑层类
export class UserService {
  constructor() {
    console.log("UserService类的构造器被执行");
  }
  pname: string = "人民"
  public login() {
    console.log(this.pname + "登录....");
  }
}
