/**
 * @description 关键实现
 */
type RouteParameters<Route extends string> = IsStringLiteralType<Route> extends false
  ? DefaultParamsDict
  : Route extends `${string}:${infer Rest}`
  ? { [K in RemoveTail<Rest, `/${string}`>]: string } & RouteParameters<Rest>
  : {}

type RemoveTail<Str extends string, Remove extends string> = Str extends `${infer Prefix}${Remove}`
  ? Prefix
  : Str

type DefaultParamsDict = Record<string, string>
type IsStringLiteralType<Str extends string> = string extends Str ? false : true

// 路径转交叉类型
type TestParams = RouteParameters<'/showFood/:foodname/:price'>
