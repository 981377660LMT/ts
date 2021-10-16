import { GetRouteParameter } from './GetRouteParameter'
import { RemoveTail } from './1RemoveTail'

export interface ParamsDictionary {
  [key: string]: string
}

//{foodname:string}
type resultType = MyRouteParameters<'/showFood/:foodname/:price/:shopname'>
type MyRouteParameters<Route extends string> = string extends Route
  ? ParamsDictionary
  : Route extends `${string}:${infer Rest}`
  ? { [K in RemoveTail<Rest, `/${string}`>]: string } & (Rest extends `${RemoveTail<
      Rest,
      `/${string}`
    >}${infer Next}`
      ? MyRouteParameters<Next>
      : unknown)
  : {}

// 源
export type RouteParameters<Route extends string> = string extends Route //string extends Route 成立 表示Route不是字符串常量而是string 推导不出细节
  ? ParamsDictionary
  : // : Route extends `${string}(${string}`
  // ? ParamsDictionary
  Route extends `${string}:${infer Rest}`
  ? (GetRouteParameter<Rest> extends never
      ? ParamsDictionary
      : GetRouteParameter<Rest> extends `${infer ParamName}?`
      ? { [P in ParamName]?: string }
      : { [P in GetRouteParameter<Rest>]: string }) &
      (Rest extends `${GetRouteParameter<Rest>}${infer Next}` ? RouteParameters<Next> : unknown)
  : {}
