import { RequestHandler } from 'express'
import 'reflect-metadata'
export function middleware(middleware: RequestHandler) {
  return function (targetPrototype: any, methodname: string) {
    Reflect.defineMetadata("middleawares",
     middleware, targetPrototype, methodname)
  }
} 