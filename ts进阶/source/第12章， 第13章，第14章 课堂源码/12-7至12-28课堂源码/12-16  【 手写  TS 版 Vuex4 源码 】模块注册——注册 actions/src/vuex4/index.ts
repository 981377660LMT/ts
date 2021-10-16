import { inject, App, InjectionKey, reactive } from 'vue'
var storeKey = 'store'

function useStore<S = any>(): Store<S> {
  return inject(storeKey) as any
}

export type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any
export interface GetterTree<S, R> {
  [key: string]: Getter<S, R>
}
export interface StoreOptions<S> {
  getters?: GetterTree<S, S>
  state?: S
  actions?: ActionTree<S, S>
  mutations?: MutationTree<S>
  modules?: ModuleTree<S>
}

/**-------ActionTree和相关接口开始 */
export interface ActionTree<S, R> {
  [key: string]: Action<S, R>
}
export type Action<S, R> = (injectee: ActionContext<S, R>, payload?: any) => any
export interface ActionContext<S, R> {
  dispatch: Dispatch
  commit: Commit
  state: S
  // getters: any;
  // rootState: R;
  // rootGetters: any;
}
/**-------ActionTree和相关接口结束 */

//  MutationTree开始
export interface MutationTree<S> {
  [key: string]: Mutation<S>
}
type Mutation<S> = (state: S, payload?: any) => any
//  MutationTree结束

class Store<S> {
  constructor(options: StoreOptions<S>) {
    this._moduleCollection = options ? new ModuleCollection(options) : Object.create(null)

    this._modulesNamespaceMap = Object.create(null)
    // this.__subscribers = []
    this._makeLocalGettersCache = Object.create(null)

    this._committing = false
    var store = this
    var ref = this
    var dispatch = ref.dispatch_
    var commit = ref.commit_
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store, type, payload)
    }
    this.commit = function boundCommit(type, payload) {
      return commit.call(store, type, payload)
    }
    // 获取根state
    // init root module.
    // this also recursively registers all sub-modules
    // and collects all module getters inside this._wrappedGetters
    var rootState = this._moduleCollection.root.state
    installModule<S>(this, rootState, [], this._moduleCollection.root)

    this.reactiveState(rootState)
  }
  _state: any

  get state(): S {
    console.log('this._state.data:', this._state.data)
    return this._state.data
  }
  getters: GetterTree<any, S> = {}
  //getters: Record<string, any> = {}
  _actions: Record<string, any> = {}
  _mutations: Record<string, any> = {}

  dispatch: Dispatch
  commit: Commit
  _committing: boolean
  _makeLocalGettersCache: object = Object.create(null)
  // 命名空间和modules键值对集合
  _modulesNamespaceMap: Record<string, ModuleWrapper<any, S>> = {}
  __subscribers = []
  // _makeLocalGettersCache: any;

  _moduleCollection: ModuleCollection<S>

  install(app: App, injectKey?: InjectionKey<Store<any>> | string): void {
    console.log('install....')
    app.provide(injectKey || storeKey, this)
    // app.config.globalProperties.$store = this;
  }

  _withCommit(fn: () => void) {
    var committing = this._committing
    this._committing = true
    fn()
    this._committing = committing
  }

  // get prototypeAccessors$1() {
  //   return { state: { configurable: true } };
  // }

  commit_(_type: any, _payload: any) {
    var ref = unifyObjectStyle(_type, _payload)
    var type = ref.type
    console.log('哈哈....commit.type...:', type)
    console.log('哈哈..this_mutations...:', this._mutations)
    console.log('哈哈..this_mutations[type]...:', this._mutations[type])

    if (!this._mutations[type]) {
      {
        console.error('[vuex] unknown mutation type: ' + type)
      }
      return
    }
    this._mutations[type](ref.payload)
  }

  dispatch_(_type: any, _payload: any) {
    var ref = unifyObjectStyle(_type, _payload)
    var type = ref.type
    if (!this._actions[type]) {
      {
        console.error('[vuex] unknown actions type: ' + type)
      }
      return
    }
    this._actions[type](ref.payload)
  }

  reactiveState<S>(rootState: S) {
    this._state = reactive({ data: rootState })
    console.log('伍伍:store.state:', this._state)
  }
}

/**
 * 初始化根模块,递归注册所有子模块
 * 收集此内的所有模块getter，mutations,actions方法
 *
 * @param store
 * @param rootState
 * @param path
 * @param module
 */

function installModule<S>(store: Store<S>, state_: S, path: any[], module_: ModuleWrapper<any, S>) {
  var isRoot = !path.length // 如果长度为0，那么就是根模块
  var namespace = store._moduleCollection.getNameSpace(path)
  if (module_.namespaced) {
    // 如果需要设置命名空间
    if (store._modulesNamespaceMap[namespace]) {
      // 如果命名空间已经存在
      console.error(
        '[vuex] duplicate namespace ' + namespace + ' for the namespaced module ' + path.join('/')
      )
    }
    store._modulesNamespaceMap[namespace] = module_
  }
  if (!isRoot) {
    // 如果不是根模块
    //  查找父级模块的state
    var parentState = getNestedState(state_, path.slice(0, -1))
    var moduleName = path[path.length - 1]
    store._withCommit(function () {
      //  如果父级 State 中 有以当前模块名命名，就抛出错误
      if (moduleName in parentState) {
        console.warn(
          '[vuex] state field "' +
            moduleName +
            '" was overridden by a module with the same name at "' +
            path.join('.') +
            '"'
        )
      }
      //  把当前模块的state用模块名【modulename】做 key 保存到父模块state【parentState】中
      ;(parentState as any)[moduleName] = module_.state
    })
  }

  var local = makeLocalContext(store, namespace, path)
  module_.forEachMutation(function (handler: Mutation<S>, key: string) {
    var namespaceType = namespace + key
    registerMutation(store, namespaceType, handler, local)
  })

  module_.forEachAction(function (handler: Action<any, S>, key: string) {
    var namespaceType = namespace + key
    registerAction(store, namespaceType, handler, local)
  })

  module_.forEachGetter(function (getter, key) {
    var namespaceType = namespace + key
    registerGetter(store, namespaceType, getter, local)
  })

  module_.forEachChild(function (child, key) {
    installModule(store, state_, path.concat(key), child)
  })
}

function registerGetter<S>(store: Store<S>, type: string, getter: Getter<any, S>, local: any) {
  if ((store.getters as any)[type]) {
    {
      console.error('[vuex] duplicate getter key: ' + type)
    }
    return
  }
  Object.defineProperty(store.getters, type, {
    get: () => {
      // local.state 当前state   local.getters当前getters
      //
      return getter(local.state, local.getters, store.state, store.getters)
    },
  })
}

function registerAction<S>(
  store: Store<S>,
  type: any,
  handler: Action<any, S>,
  local: ActionContext<any, S>
) {
  // if (store._actions[type]) {// 如果type 类型的 action 已经存在store中
  //   return
  // }

  store._actions[type] = function (payload: any) {
    handler.call(
      store,
      {
        // 对应ActionContext
        dispatch: local.dispatch,
        commit: local.commit,
        state: local.state,
        //getters: local.getters,
        //rootState: store.state,
        //rootGetters: store.getters
      },
      payload
    )
  }
}

function registerMutation<S>(
  store: Store<S>,
  type: any,
  handler: Mutation<S>,
  local: ActionContext<any, S>
) {
  if (store._mutations[type]) {
    //如果type 类型的 mutation已经存在store中
    return // 跳过
  }
  store._mutations[type] = function (payload: any) {
    handler.call(store, local.state, payload)
  }
}

function makeLocalContext<S>(store: Store<S>, namespacename: string, path: Array<any>) {
  var noNamespace = namespacename === ''

  var local: ActionContext<any, S> = {
    dispatch: noNamespace
      ? store.dispatch
      : function (_type: any, _payload: any, _options: any) {
          var args = unifyObjectStyle(_type, _payload)
          var payload = args.payload
          var type = args.type

          if (!_options || !_options.root) {
            type = namespacename + type
            console.log('type:', type)
            console.log('store._actions[type]:', store._actions[type])
            //  如果 store 的 actions 属性没有包含 key 为 type 的对象
            //  那么页面 dispatch 会抛出错误，因为访问了一个不存在的异步方法
            if (!store._actions[type]) {
              console.error(
                '[vuex] unknown local action type: ' + args.type + ', global type: ' + type
              )
              return
            }
          }
          return store.dispatch(type, payload)
        },
    commit: noNamespace
      ? store.commit
      : function (_type: any, _payload: any, _options: any) {
          var args = unifyObjectStyle(_type, _payload)
          var payload = args.payload
          var type = args.type
          if (!_options) {
            // 因为
            type = namespacename + type
            console.log('type:', type)
            console.log('store._mutations:', store._mutations)
            console.log('store._mutations[type]:', store._mutations[type])

            if (!store._mutations[type]) {
              console.error(
                '[vuex] unknown local mutation type: ' + args.type + ', global type: ' + type
              )
              return
            }
          }
          store.commit(type, payload)
        },
    state: {},
  }

  Object.defineProperties(local, {
    state: {
      get: function () {
        return getNestedState(store.state, path)
      },
    },
  })
  return local
}

/**
 * 命名空间是否匹配getter方法名中的命名空间【方法名前的部分】部分
 * 比如:namespacename=usermodule/rolemodule/getRole/
 * @param store
 * @param namespacename
 */
function makeLocalGetters(store: any, namespacename: any) {
  //  如果 store 中没有存储 以 namespacename 为名字的getters
  if (!store._makeLocalGettersCache[namespacename]) {
    var gettersProxy = {}
    var splitPos = namespacename.length
    Object.keys(store.getters).forEach(function (type) {
      // getters方法名不匹配命名空间,跳过
      if (type.slice(0, splitPos) !== namespacename) return
      // 提取去除命名空间后的部分[getter方法名]
      var getterMethodName = type.slice(splitPos)

      // 定义 getterMethodName 属性, get 选择器返回对应哟啊执行的方法

      // 页面获取 getAllProduct---store.getters.getAllProduct
      // store.getters["usermodule/getUserinfo"] 会执行 get 选择器
      Object.defineProperty(gettersProxy, getterMethodName, {
        get: function () {
          return store.getters[type]
        },
        enumerable: true,
      })
    })

    // 把  gettersProxy 保存到 getters 缓存中
    store._makeLocalGettersCache[namespacename] = gettersProxy
  }
  return store._makeLocalGettersCache[namespacename]
}

function unifyObjectStyle(type: any, payload: any) {
  // 如果type类型不为字符串,直接抛出错误
  {
    assert(typeof type === 'string', 'expects string as the type, but found ' + typeof type + '.')
  }
  // return { type: type, payload: payload, options: options }
  return { type, payload }
}

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error('[vuex] ' + msg)
  }
}

function isObject(obj: any): obj is Record<any, any> {
  return obj !== null && typeof obj === 'object'
}

function getNestedState<S>(state: S, path: string[]) {
  return path.reduce(function (state, key) {
    return (state as any)[key]
  }, state)
}

class ModuleCollection<S> {
  root!: ModuleWrapper<any, S>
  constructor(rawRootModule: Module<any, S>) {
    this.register([], rawRootModule)
    console.log('this.root:', this.root)
  }

  getNameSpace(path: string[]) {
    var module = this.root
    return path.reduce(function (namespace, key) {
      console.log('path==reduce哈哈:', key)
      module = module.getChild(key)
      return namespace + (module.namespaced ? key + '/' : '')
    }, '')
  }

  // 注册【添加】根模块和所有子模块直到添加完最后一级子模块
  register(path: any[], rawModule: Module<any, S>) {
    var newModule = new ModuleWrapper(rawModule)
    console.log('要添加的子模块:', newModule)
    console.log('拿命名空间当路径——path:', path)
    if (path.length == 0) {
      // path长度等于0 为根模块
      console.log('开始添加根模块:', newModule)
      this.root = newModule
      console.log('根模块添加结束:', this.root)
      console.log('=====================')
    } else {
      // 添加子模块到父级模块中
      console.log('开始添加子模块到父级模块中')
      var parent: ModuleWrapper<any, S> = this.get(path.slice(0, -1))
      console.log('1.先获取父级ModuleWrapper对象:', parent)
      parent.addChild(path[path.length - 1], newModule)
      console.log('2.添加子模块完成后:', parent)
      console.log('=====================')
    }
    if (rawModule.modules) {
      // 如果存在子模块，继续递归添加

      Object.keys(rawModule.modules).forEach(key => {
        this.register(path.concat(key), (rawModule.modules as any)[key])
      })
    }

    // 方法中参数：path: ["foodSortModule", "foodModule", "foodDetailModule"]
    // root: addChild: {"foodSortModule":new  ModuleWrapper对象}
    //   .addChild: {"foodModule": new ModuleWrapper对象}
    //   .准备添加的模块调用addChild方法之前: {"foodDetailModule",正准备创建ModuleWrapper对象}

    //   // 如何添加foodDetailModule模块到_children
    //   {"foodDetailModule": 正准备创建ModuleWrapper对象}
  }
  get(path: Array<any>): ModuleWrapper<any, S> {
    return path.reduce(function (module: ModuleWrapper<any, S>, key: string) {
      return module.getChild(key)
    }, this.root)
  }
}

export class ModuleWrapper<S, R> {
  _children: Record<string, ModuleWrapper<any, R>> // 保存下一个ModuleClass类对象
  _rawModule: Module<any, R> // 保存每一个Module模块到ModuleClass对象
  state: S
  namespaced: boolean
  context = Object.create(null)

  constructor(rawModule: Module<any, R>) {
    this._children = Object.create(null)
    this._rawModule = rawModule
    //var rawState = rawModule.state;
    //this.state = Util.isFunction(rawState) ? rawState() : rawState
    this.state = rawModule.state || Object.create(null)
    this.namespaced = rawModule.namespaced || false
  }
  addChild(key: string, module: ModuleWrapper<any, R>) {
    this._children[key] = module
  }
  getChild(key: string) {
    return (this._children as any)[key]
  }
  forEachMutation(fn: MutationToKey<S>) {
    if (this._rawModule.mutations) {
      // 如果 mutations 存在
      Util.forEachValue(this._rawModule.mutations, fn)
    }
  }

  forEachAction(fn: ActionToKey<S, R>) {
    if (this._rawModule.actions) {
      Util.forEachValue(this._rawModule.actions, fn)
    }
  }
  forEachGetter(fn: GettersTokey<S, R>) {
    if (this._rawModule.getters) {
      Util.forEachValue(this._rawModule.getters, fn)
    }
  }
  forEachChild(fn: ChildModuleTokey<R>) {
    Util.forEachValue(this._children, fn)
  }
}

interface GettersTokey<S, R> {
  (module: Getter<S, R>, key: string): void
}

interface ChildModuleTokey<R> {
  (module: ModuleWrapper<any, R>, key: string): void
}

interface MutationToKey<S> {
  (mutation: Mutation<S>, key: string): void
}

interface ActionToKey<S, R> {
  (action: Action<S, R>, key: string): void
}

class Util {
  static isFunction(func: any): func is Function {
    return typeof func === 'function'
  }

  static forEachValue(obj: object, fn: any) {
    Object.keys(obj).forEach(function (key) {
      return fn((obj as any)[key], key)
    })
  }
}

function isPromise(val: any): val is Promise<any> {
  return val && typeof val.then === 'function'
}

export interface ModuleTree<R> {
  [key: string]: Module<any, R>
}
export interface Module<S, R> {
  namespaced?: boolean
  state?: S | (() => S)
  actions?: ActionTree<S, R>
  mutations?: MutationTree<S>
  modules?: ModuleTree<R>
  getters?: GetterTree<S, R>
}

export type Commit = (type: string, payload?: any, options?: any) => void
export type Dispatch = (type: string, payload?: any, options?: any) => any
//export type Dispatch = (type: string, payload?: any) => Promise<any>;

function createStore<S>(options: StoreOptions<S>) {
  console.log('...createStore....')
  return new Store<S>(options)
}

export { Store, createStore, useStore }
