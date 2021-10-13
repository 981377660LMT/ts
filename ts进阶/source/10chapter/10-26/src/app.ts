import 'reflect-metadata'
import express from 'express'
import session from 'express-session'

// 引入控制器ts文件,会自动执行HomeController文件中方法装饰器@get和类装饰器@Controller
// 因为装饰器在/router/controlldecorators 这个文件中,
// 这一执行直接导致router增加了路由完成，就是controlldecorators的第S100行代码的执行
import './controller/UserController'
//import './controller/RightsController'

// 然后在引入路由器
import { router } from './util/router'

//Express4.16+已经在express包中加入了bodyParser,可直接作为express的方法使用.
const app = express();//Creates an Express application.

// 设置session关联的cookie信息
app.use(session({
  secret: "cookeid12345",
  name: "cookieinfo",
  resave: false,
  saveUninitialized: true,
}))

//   Express4.16+后的 处理表单数据 url 集成到了express框架中
app.use(express.urlencoded({ extended: false }))////处理表单数据 url
app.use(router)//添加路由到express应用对象-app对象中

let server = app.listen(8000, function () {
  console.log('node服务器启动,端口8000') //服务启动完成,输出日志
})
