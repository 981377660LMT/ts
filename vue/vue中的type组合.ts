// 可以看到
// !1. 接口是多个小模块(组件)组合起来的
// !2. 拆成核心和 extraInfo 两部分

export declare function effect<T = any>(fn: () => T, options?: ReactiveEffectOptions): ReactiveEffectRunner

export interface ReactiveEffectRunner<T = any> {
  /** 可以手动运行. */
  (): T
  effect: ReactiveEffect
}

export interface ReactiveEffectOptions extends DebuggerOptions {
  lazy?: boolean
  scheduler?: EffectScheduler
  scope?: EffectScope
  allowRecurse?: boolean
  onStop?: () => void
}
export interface DebuggerOptions {
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}

export type DebuggerEvent = {
  effect: ReactiveEffect
} & DebuggerEventExtraInfo

export type DebuggerEventExtraInfo = {
  target: object
  type: TrackOpTypes | TriggerOpTypes
  key: any
  newValue?: any
  oldValue?: any
  oldTarget?: Map<any, any> | Set<any>
}

export type EffectScheduler = (...args: any[]) => any
export declare class ReactiveEffect<T = any> {
  fn: () => T
  scheduler: EffectScheduler | null
  active: boolean
  deps: Dep[]
  parent: ReactiveEffect | undefined
  onStop?: () => void
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
  constructor(fn: () => T, scheduler?: EffectScheduler | null, scope?: EffectScope)
  run(): T | undefined
  stop(): void
}

export declare class EffectScope {
  detached: boolean
  constructor(detached?: boolean)
  get active(): boolean
  run<T>(fn: () => T): T | undefined
  stop(fromParent?: boolean): void
}

type Dep = Set<ReactiveEffect> & TrackedMarkers
/**
 * wasTracked and newTracked maintain the status for several levels of effect
 * tracking recursion. One bit per level is used to define whether the dependency
 * was/is tracked.
 */
type TrackedMarkers = {
  /**
   * wasTracked
   */
  w: number
  /**
   * newTracked
   */
  n: number
}

export declare const enum TrackOpTypes {
  GET = 'get',
  HAS = 'has',
  ITERATE = 'iterate'
}
export declare const enum TriggerOpTypes {
  SET = 'set',
  ADD = 'add',
  DELETE = 'delete',
  CLEAR = 'clear'
}
