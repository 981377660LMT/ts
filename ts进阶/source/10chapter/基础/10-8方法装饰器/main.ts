// 增强目标类的方法功能
class StringUtil {
  //工具类
  public static trimSpace(str: string): string {
    return str.replace(/\s+/g, '')
  }
}

class RoleService {
  public roleName: string

  constructor() {
    this.roleName = '管理员'
  }

  @NormalizeName('假装有个参数')
  DistribRoles(userName: string, isValid: boolean) {
    console.log('分配角色.....')
  }
}

function NormalizeName(paramsValue: string): MethodDecorator {
  console.log('方法装饰器....')
  return function (target, prop, descriptor: PropertyDescriptor) {
    // 1.1 先保存目标类的方法到targetMethodSave
    console.log('进入方法装饰器：methodDecri:', descriptor)
    const preMethod = descriptor.value
    console.log('preMethod:', preMethod)

    // 1.2.让value函数建立新得函数对象空间 注意不会立即执行
    descriptor.value = function (...args: any[]) {
      console.log('this:', this)

      // 迭代所有参数
      args = args.map(arg => {
        if (typeof arg === 'string') {
          return StringUtil.trimSpace(arg)
        }
        return arg
      })
      console.log(args)

      // 1.4.总结:这是一种典型的用方法装饰器扩大原来方法功能的案例

      // 1.5 但如果增强原来方法功能后,还想继续执行原来RoleService类中DistribRoles方法
      // 使用apply执行targetMethodSave原来函数
      return preMethod.apply(this, args)
    }

    //  方法执行之后，继续执行后续代码
    console.log('descriptor.value:')
  }
}

const roleService = new RoleService()
roleService.DistribRoles('cm nx', true)
