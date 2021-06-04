import 'reflect-metadata'

@Reflect.metadata('token', 'aW1vb2M=')
class Employee {
  @Reflect.metadata('level', 'D2')
  salary() {
    console.log('这是个秘密')
  }

  @Reflect.metadata('times', 'daily')
  static meeting() {}
}

const token = Reflect.getMetadata('token', Employee)
const level = Reflect.getMetadata('level', new Employee(), 'salary')
const times = Reflect.getMetadata('times', Employee, 'meeting')

console.log(token) // aW1vb2M=
console.log(level) // D2
console.log(times) // daily
// 实例方法与静态方法取元数据是不同的，实例方法需要在类的实例上取元数据，静态方法直接在类上取元数据。
