// 模板方法模式 Template Method
// 特点：通过多态来实现在运行时使用不同的算法或逻辑，通常有一个整体架子，通过抽象方法或虚方法来把细节代码延迟到子类实现。
// 用处：当多个类似功能的类有很多相同结构或代码时，可以抽象出整体架子时可以考虑模板方法。
// 注意：与策略模式的异同：同样是细节部分交出去，不同在于策略是对象行为，采用的是组合的方式，而模板方法是类行为，采用的是继承。

// 发送http请求的代码，需要向两台不同的server(A和B)发送请求，两台server除了url不同，
// 回来的数据格式也不一样，但由于都是http请求，主体架子是一样的，所以可以用模板方法来实现下。
class ClassA {} // Server A 返回的数据结构
class ClassB {} // Server B 返回的数据结构

abstract class BaseRequester<T> {
  constructor(private url: string) {}

  reqeustData(): T {
    this.sendReqeust()
    return this.handleResponse()
  }

  private sendReqeust() {
    console.log(`send request, url: ${this.url}`)
  }

  protected abstract handleResponse(): T // 不同的server返回的数据交由子类去实现
}

class RequesterForServerA extends BaseRequester<ClassA> {
  protected handleResponse(): ClassA {
    console.log('handle response for Server A')
    return { data: 1 }
  }
}

class RequesterForServerB extends BaseRequester<ClassB> {
  protected handleResponse(): ClassB {
    console.log('handle response for Server B')
    return { data: 2 }
  }
}

let requesterA = new RequesterForServerA('server A')
let requesterB = new RequesterForServerB('server B')
requesterA.reqeustData()
requesterB.reqeustData()

// 这里可以看到主体功能由基类RequesterBase实现，两个子类则实现解析数据这些细节，
// 这样就达到了消除重复代码的目的。 如果还有个ServerC的request发送部分也不一样，
// 也没关系，TypeScript天生虚函数，在子类直接实现reqeustData即可，多态的作用下，
// 运行时还是会调用到子类上。

// 其实就是抽象基类
