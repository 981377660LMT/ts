function extension(params: string) {
  return function (target: any) {
    console.log('类装饰器')
  }
}

function method(params: string) {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('方法装饰器')
  }
}

function attribute(params: string) {
  return function (target: any, name: string) {
    console.log('属性装饰器')
  }
}

function argument(params: string) {
  return function (target: any, name: string, index: number) {
    console.log('参数装饰器', index)
  }
}

@extension('类装饰器')
class Employee_ {
  @attribute('属性装饰器')
  public name!: string

  @method('方法装饰器')
  salary(@argument('参数装饰器') name: string, @argument('参数装饰器') department: string) {}
}
