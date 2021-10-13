
import { Request, Response, NextFunction, RequestHandler } from 'express'
import { getSession } from '../util/sessionUtil';

export const isValidUser: RequestHandler = (req: Request, res: Response,
  next: NextFunction) => {
  console.log("第一个中间件函数...执行isValidUser...")
  let session = getSession(req);
  if (session.userinfofrmdb && session.userinfofrmdb.mark === "noallowlogin") {
    res.setHeader("Content-Type", "text/html; charset=utf-8")
    res.write("您是被禁人士，被限制访问");
    res.end();
  } else {
    next();// 进入到下一个中间件函数来执行,如果没有中间件,就直接执行请求方法
  }
}

// 测试中间件函数1
export const SecondMiddleAware = (req: Request, res: Response,
  next: NextFunction) => {
  console.log("第二个中间件函数....")
  next();
}