// SessionUtil.ts 工具类
import { Request } from 'express'
export function getSession(req: Request) {
  return (req as any).session
}