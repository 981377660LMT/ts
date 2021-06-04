import 'reflect-metadata'

function get(path: string): MethodDecorator {
  return (target, name) => {
    Reflect.defineMetadata('path', path, target, name)
  }
}

class Employee {
  @get('/init')
  async init() {}
}

const metadata = Reflect.getMetadata('path', new Employee(), 'init')
console.log(metadata) // '/init'
