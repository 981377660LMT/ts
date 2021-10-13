
import { Request, Response, NextFunction } from 'express'
import { getSession } from '../util/sessionUtil';

export const isValidUser = (req: Request, res: Response,
  next: NextFunction) => {
  console.log("执行isValidUser...")
  let session = getSession(req);
  if (session.userinfofrmdb && session.userinfofrmdb.mark === "noallowlogin") {
    res.setHeader("Content-Type", "text/html; charset=utf-8")
    res.write("您是被禁人士，被限制访问");
    res.end();
  } else {
    next();
  }
}