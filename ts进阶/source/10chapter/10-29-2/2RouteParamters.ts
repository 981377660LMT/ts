import { GetRouteParameter } from './GetRouteParameter'
import { RemoveTail } from './1RemoveTail'
export interface ParamsDictionary {
  [key: string]: string;
}
//{foodname:string}
type resultType = RouteParameters1<'/showFood/:foodname/:price/:shopname'>
type RouteParameters1<Route extends string> =
  string extends Route ? ParamsDictionary :
  Route extends `${string}(${string}` ? ParamsDictionary :
  Route extends `${string}:${infer Rest}` ?
  { [P in RemoveTail<Rest, `/${string}`>]: string }
  &
  (
    Rest extends `${RemoveTail<Rest, `/${string}`>}${infer Next}`?
    RouteParameters1<Next>:unknown
  )
  : {}




export type RouteParameters<Route extends string> = string extends Route
  ? ParamsDictionary
  : Route extends `${string}(${string}`
  ? ParamsDictionary
  : Route extends `${string}:${infer Rest}`
  ? (
    GetRouteParameter<Rest> extends never
    ? ParamsDictionary
    : GetRouteParameter<Rest> extends `${infer ParamName}?`
    ? { [P in ParamName]?: string }
    : { [P in GetRouteParameter<Rest>]: string }
  ) &
  (Rest extends `${GetRouteParameter<Rest>}${infer Next}`
    ? RouteParameters<Next> : unknown)
  : {};
