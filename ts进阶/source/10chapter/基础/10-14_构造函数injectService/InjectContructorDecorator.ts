import 'reflect-metadata'
import collectionInstance from './Collection'
type MyParameterDecorator = (
  target: Object,
  paramname: string | symbol,
  parameterIndex: number
) => void
export function InjectContructor(injectid?: string): MyParameterDecorator {
  return (targetClass, paramname, paramindex) => {
    console.log('targetClass:', targetClass)
    console.log('paramname:', paramname)
    console.log('paramindex:', paramindex)

    const constructorParamArr = Reflect.getMetadata('design:paramtypes', targetClass)
    let constrParamArrObj = new constructorParamArr[paramindex]() // 注入的Service类
    console.log('constrParamArrObj[paramindex]:', constrParamArrObj)
    collectionInstance.set(injectid!, constrParamArrObj)
  }
}

export {}
