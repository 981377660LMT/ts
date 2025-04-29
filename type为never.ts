// 如何理解这里的 type?: never

type JsOptions = {
  type: 'js'
  js?: Partial<HTMLScriptElement>
  keepWhenUnused?: boolean
}
type CssOptions = {
  type: 'css'
  css?: Partial<HTMLStyleElement>
  keepWhenUnused?: boolean
}
type DefaultOptions = {
  type?: never // 如果不传，则根据 path 推导
  js?: Partial<HTMLScriptElement>
  css?: Partial<HTMLStyleElement>
  keepWhenUnused?: boolean
}
export type Options = JsOptions | CssOptions | DefaultOptions
export type Status = 'unset' | 'loading' | 'ready' | 'error' // 加载状态，unset(未设置), loading(加载中), ready(加载完成), error(加载失败)
declare const useExternal: (path?: string, options?: Options) => Status
