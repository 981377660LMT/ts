import * as http from 'http'

interface Response<
  ResBody = any,
  Locals extends Record<string, any> = Record<string, any>,
  StatusCode extends number = number
> {
  status(code: StatusCode): this //等价于当前函数所在的接口类型
  // send?: Send<ResBody, this>;
  send(body?: ResBody): this
}

// 更加语义化
export type Send<ResBody = any, T = Response<ResBody>> = (body?: ResBody) => T

const response: Response = {
  status(code: number): Response {
    return response
  },
  send(body: any): Response {
    return response
  },
}

response.status(200).status(300)
response.send('<div>one</div>').send('<div>two</div>')

export {}
