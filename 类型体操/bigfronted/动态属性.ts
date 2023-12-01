// 动态属性参数
// 能不能做到，不声明泛型，则不存在metadata属性，声明泛型，则存在metadata属性
// 通过泛型的条件类型来实现动态属性参数

interface IFailedFileWithoutMetadata {
  originFile: File
  url?: string
  dispose: () => void
}

interface IFailedFileWithMetadata<M extends object> extends IFailedFileWithoutMetadata {
  metaData: M
}

type IsNever<T> = [T] extends [never] ? true : false
type IFailedFile<M extends object = never> = IsNever<M> extends true ? IFailedFileWithoutMetadata : IFailedFileWithMetadata<M>

// 使用
let file1: IFailedFile // 没有 metaData 属性
file1.metadata
let file2: IFailedFile<{}> // 有 metaData 属性
file2.metaData
