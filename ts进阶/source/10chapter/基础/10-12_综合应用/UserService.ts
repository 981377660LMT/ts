// 2 编写业务类
export class UserService {
  pname: string

  constructor() {
    this.pname = '人民'
    console.log('创建UserService类对象')
  }

  public login() {
    console.log(this.pname + '登录....')
  }
}
