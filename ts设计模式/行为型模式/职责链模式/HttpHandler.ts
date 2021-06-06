// 职责链模式 Chain of Responsibility
// 特点：可以让一个请求被不同的对象处理多次，请求像经过管道一样， 一路上都可以被拦下处理。
// 用处：当请求需要被链式处理时，可以考虑职责链模式，比如事件的冒泡，WebApi的管道Handler等。
// 注意：链的实现。

// WebApi的handler可能大家有用过，对发出去的请求和请求回来的数据都可以用自定义handler在发出前或最终回来前进行处理，非常方便，下面用TypeScript来简单实现一个HttpHandler:

// 先建立一个抽象Handler类，包含一个发送请求的sendReqeust以及用来链式处理的innerHandler：
class HttpHandler {
  constructor(protected innerHandler?: HttpHandler) {}

  async sendRequest(req: string): Promise<string> {
    if (this.innerHandler) {
      return await this.innerHandler.sendRequest(req)
    } else {
      let res = `response`
      console.log(res)
      return res
    }
  }
}

class FirstHttpHandler extends HttpHandler {
  async sendRequest(req: string): Promise<string> {
    req = `<req1>${req}</req1>` // 把请求包一下
    console.log(req)

    let res = await super.sendRequest(req)

    res = `<res1>${res}</res1>` // 把结果包一下
    console.log(res)

    return res
  }
}

class SecondHttpHandler extends HttpHandler {
  async sendRequest(req: string): Promise<string> {
    req = `<req2>${req}</req2>` // 把请求包一下
    console.log(req)

    let res = await super.sendRequest(req)

    res = `<res2>${res}</res2>` // 把结果包一下
    console.log(res)

    return res
  }
}

// 把两个HttpHandler连起来
let httpHandler = new FirstHttpHandler(new SecondHttpHandler())
console.log('start')
httpHandler.sendRequest('request').then(res => console.log('finish'))

// start
// <req1>request</req1>
// <req2><req1>request</req1></req2>
// response
// <res2>response</res2>
// <res1><res2>response</res2></res1>
// finish
// 处理的顺序就是 1221,中间是真正取数据的，这就是管道处理最基本的代码，用到的就是职责链模式。

// 当然职责链的形成有很多方式，这里采用的是装饰手段，保存下一个的引用的方式来形成一个链表，还可以采用队列或栈方式保存所有handler，按顺序执行。
