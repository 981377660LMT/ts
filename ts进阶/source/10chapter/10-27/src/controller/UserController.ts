import 'reflect-metadata'
import { Request, Response } from 'express'
import {
  Autowired, Singleton, get, post, Controller
} from '../decorator'

import { UserServiceImpl, UserServiceInter } from '../service'
import { getSession } from '../util/sessionUtil'
import { Userinfo } from '../entity/UserInfo'

@Controller("/")
class UserController {

  //@Autowired("userServiceImpl")//  修改Inject 为更专业的 Autowired 单词
  @Autowired("userServiceImpl")
  @Singleton(true)
  private userServiceImpl!: UserServiceInter // 修改Inject 为更专业的 Autowired 单词

  @get("/login")
  login(req: Request, res: Response): void {

    let htmlstr = `<div><form method="post" 
    action = "/loginprocess"><div>用户名: 
    <input type='text' name = 'username'/> </div><div>
     密码: <input type='password' name = 'pwd'/> </div>
     <div><input type="submit" value = "提交" /> </div>
     </form></div>`
    res.send(htmlstr);
  }

  @get('/')
  index(req: Request, res: Response): void {
    if (getSession(req).userinfofrmdb) {
      let htmlstr = `<div><a href='/searchFoodHistory'
       style='text-decoration:none;color:red'> 搜索美食历史信息 </a></div><div><a href = '/orderInfo'  style='text-decoration:none;color:red'> 订单信息 </a></div><div><a href="/loginout" style='text-decoration:none;color:red'>注销</a></div>`;
      res.send(htmlstr);
    } else {
      res.redirect("/login")
    }
  }
  @post("/loginprocess")
  loginprocess(req: Request, res: Response): void {

    console.log("loginprocess=this:", this);
    let session = getSession(req);

    let UserServiceImpl: UserServiceImpl = Reflect.getOwnPropertyDescriptor(UserController.prototype,
      "userServiceImpl").value//S100
    let userinfofrmdb: Userinfo = UserServiceImpl.Login
      (req.body.username, req.body.pwd)
    if (userinfofrmdb && userinfofrmdb.username)
      session.userinfofrmdb = userinfofrmdb
    // 基础复习：req.send只能发送一次,如果想发送多次,就必须使用res.write
    res.setHeader("Content-Type", "text/html;charset=UTF-8")
    let outputhtml = "";
    if (userinfofrmdb.role === "admin") {
      outputhtml += `<div>管理员:${userinfofrmdb.role}</div>`
      outputhtml += `<div><a href="/rightsmanager">进入管理员权限页面</a></div>`
    }
    res.write(outputhtml);
    res.write(`<div>登录成功,欢迎你:${userinfofrmdb.username}</div>`);
    res.write(`<div><a  href="/">进入首页</a></div>`);
    res.write(`<div><a  href="/showFood">进入美食首页</a></div>`);
    res.end();
  }

  test(): void {
    // 增加....
    //let userService: UserService = CollectionInstance.get("userService");
    //userService.register();
    let UserServiceImpl: UserServiceImpl =
      Reflect.getOwnPropertyDescriptor(UserController.prototype,
        "userServiceImpl").value//S100
    UserServiceImpl.register();
  }
}



