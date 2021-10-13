// https://stackoverflow.com/questions/46969551/constructor-in-typescript-interface

// 构造函数是一个特殊的、静态的函数调用，它返回自己的一个实例，
// 所以它不能真正成为接口的一部分，因为接口成员是实例绑定的。

// 接口只能限定实例的public属性与方法(interfaces are about ensuring what is created)
interface Options {
  url: string
  xPathExpression: string
  dirName?: string
  extName?: `.${string}`
}

// 1.实例接口
interface IFileGenerator {
  getSourceFrom: (url: string) => Promise<string>
  parseFromSource: <T>(source: string, xPathExpression: string) => Promise<T>
  normalizeData: <T>(data: T) => Promise<string[]>
  generateFiles: (fileNames: string[], dir?: string, extName?: `.${string}`) => Promise<void>
}

// 2.静态构造函数
interface FileGeneratorConstructor {
  new (options: Options): IFileGenerator
  readonly prototype: IFileGenerator
}

// 3.声明类为构造函数
declare const FileGenerator: FileGeneratorConstructor

new FileGenerator({ url: '', xPathExpression: '' })

export {}
