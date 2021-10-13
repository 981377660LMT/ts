## 慕课网 TS 高级课程

### 	  第12章： 手写 高水准大厂 的 TS 版 Vuex4 源码 

**技能大纲**

**12-1   【 理解 Vuex4  】 贴切比喻通俗形象理解 Vuex  【会的同学略过，加量不加价】**

**12-2   【  Vuex4  单模块丶多模块+Vue3 + TS 整合 上 +下  】 【会的同学略过，加量不加价】**

**12-3    【 store 切割 】 公司 切割 store 的设计方案有哪些不好？ 【加量扩展】**

**12-4     【getter 自动推导】Vuex 为什么不能推导 getter 方法，又如何解决呢？【加量扩展】**

##### **12-5   【 Vuex4 源码整体架构 】 TS  版的 Vuex4 源码架构详解**

**12-6+12-7    【 手写  TS 版 Vuex4 源码 】 构建 Store  架构 及 诸多相关**

##### **12-8   【 手写  TS 版 Vuex4 源码 】单模块源码和应用+Vue3组件整合输出**

##### 12-9   【 手写  TS 版 Vuex4 源码 】多模块源码和应用+Vue3组件整合输出

##### 12-10  【 手写  TS 版 Vuex4 源码 】 为模块注册准备——多模块源码升级优化

##### 12-11  【 手写  TS 版 Vuex4 源码 】 commit 和 dispatch 实现

##### 12-12  【 手写  TS 版 Vuex4 源码 】  commit 和 dispatch  优化

##### 12-13  【 手写  TS 版 Vuex4 源码 】模块注册—— 管理 state 源码实现

**12-14  【 手写  TS 版 Vuex4 源码 】模块注册——注册 getters**

##### 12-15  【 手写  TS 版 Vuex4 源码 】模块注册——注册 mutations  

##### 12-16  【 手写  TS 版 Vuex4 源码 】模块注册——注册 actions  

**12-17  【 手写  TS 版 Vuex4 源码 】模块注册——ActionContext  对象实现  **

**12-18  【 手写  TS 版 Vuex4 源码 】模块注册——注册 子模块+解决模块重复问题**

**12-19  【 手写  TS 版 Vuex4 源码 】模块注册—— 挑战性有难度的作业—— 响应式实现** 

**12-20    【 手写  TS 版 Vuex4 源码 】 大功告成 ！ Vue3 +Vuex 4+TS   再次整体运行**



**慕课网 TS 高级课程**

**12-1   【 理解 Vuex4  】 贴切比喻形象理解 Vuex  **

**1**. **Vuex 官方解释**： Vue 应用程序开发的状态管理模式，它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

小说明：【react 技术栈的同学理解 mutations 类似  reducer ，其他都好理解啦。】

**2. store 定义:**   Vuex 中的核心对象，是 一个 全局唯一的组件数据状态的提供和管理者，也是组件数据状态改变的方法提供者。

**3. 通俗理解 **Vuex ：Vuex 借助 store 用来管理项目中所有组件的数据以及所有组件的数据变化的模式【特定功能的代码集合就是一种模式】，借助 store 对象  来完成组件中数据管理的模式， store 对象 主要完成2件事。

**3.1 第一件事**：通过 一个总的 state 对象或函数【一般为对象】 集中管理项目中所有组件在页面上呈现出来【渲染出来即呈现】的所有数据。

用一个比喻来理解下第一件事： 首先来一个假设，假如一个小区只有一个丰巢柜 

1 这个总的 state 类似于一个小区的丰巢柜的所有包裹【包裹比喻成用户看到的数据，每一个包裹都是一个state, 所有包裹就是总的 state 】

2 客户下单好比用户访问项目某个功能

3 比如：有一个 OA 项目，用户页面上填写出差报销和报销详情并提交 ，**好比**，客户填写购买信息并下单买了一双鞋；用户最终在页面上看到了自己提交的报销信息（state数据在页面上的展示），**好比**，用户最终拿到了包裹（每一个包裹都可以看成 一个 state中的数据）。

**3.2** **第二件事：管理项目中任何一个组件在页面上呈现出来的数据的变化【也就是数据状态的变化】**

继续上面的比喻：客户下单后自己想追加一双鞋，再次下单，**好比**，用户又重新添加了一条新的报销和报销详情记录，会发生什么？首先 store 对象中 总的 state 对象 中会首先多出来新的报销记录【然后再发给后端直至到数据表】，然后 state 对象 的变化会同步刷新到页面【何为同步刷新？——当 store 对象 的state 数据发生变化时会通知 Vue 组件，进行响应式的更新。】

**4. 理解 store的各个组成部分**

**actions  定义** ：提供任何组件完成页面业务功能【比如：登录】需要调用的方法的一个对象。

**定义理解**：actions 中的 每一个方法都必须异步访问后端服务器提供的 API。

**mutations 定义**：接受 actions 对象方法传递过来的数据的对象 ，

**定义理解**：mutations  把接收到的数据【新数据即数据状态的改变】传递给 state 。尽管用户通过组件页面可以直接访问 到 mutations 的方法，但由于是同步机制而放弃这么做。

**state 定义**：一个提供所有组件的渲染数据【指响应式数据】的对象或函数【一般为对象】

**定义理解：**

1.  state 接收到 mutations 的 数据变化后，会通知 Vue 组件，进行响应式的更新。2.  组件只能读取 state，不能修改之

**gettters 定义**：提供组件的 获取 响应式 state 数据 的对象。

**完整配合过程**：用户在组件渲染后的页面发出请求， 组件通过 store. dispatch 访问 到 actions 方法的异步方法，然后异步访问后端服务器提供的 API，后端服务器把从数据表中取出来的数据返回给 actions的方法后，actions 再 commit (提交）给 mutations 对象中的对应的方法，mutations 对象中的该方法 把数据传递给   响应式 的 state, 通知 Vue 组件，响应式的更新页面。

**12-2   【  Vuex4  单模块丶多模块+Vue3 + TS 整合  】 【会的同学略过，加量不加价】**

**12-3    【 store 切割 】 公司 切割 store 的设计方案有哪些不好？ 【加量扩展】**

**12-4     【getter 自动推导】Vuex 为什么不能推导 getter 方法，又如何解决呢？【加量扩展】**

**解决：为复合路径增加可以推导的类型**

**慕课网 TS 高级课程**

**12-5   【 Vuex4 源码整体架构 】 TS  版的 Vuex4 源码架构详解**

Vuex4 源码架构

**Store 类**

**属性:**

_moduleCollection ——模块集合对象

_modulesNamespaceMap ——模块和命名空间映射

dispatch ——访问 actions 异步方法的函数类型的属性

commit ——访问 mutations 方法的函数类型的属性

state —— 一个提供所有组件的渲染数据【指响应式数据】的对象或函数【一般为对象】

_state —— state 响应式数据的备份

**方法：**

commit_  —— 一个可以访问  mutations 对象中方法的方法

dispatch_——一个可以访问  actions  对象中方法的方法

reactiveState ——把根模块中的 state 变成响应式 state 的方法

install ——app.use(store)【store 中间件挂载到app上】  时 需要调用的方法。



**useStore 函数**

一个可以把挂载到  app 的  store 对象 inject 出来【inject 就是注入，从别的地方拿到对象的意思】 



**createStore 函数**

一个创建 store类对象的函数



**ModuleCollection**：封装和管理所有模块的类，类成员：

**属性：**

1. root——根模块属性

**方法：**

2. register——注册根模块和子模块的方法 【注册就是添加】

3. getNameSpace——循环递归获取命名空间方法

4. getChild——获取子模块方法



**ModuleWrapper**：封装和管理某一个模块的类，主要成员有:

**属性：**

1. children ——保存当前模块下子模块

2. rawModule ——保存当前模块的属性

3. state —— 保存当前模块的 state 的属性

4. namespaced —— 判断 当前模块是否有命名空间的属性

5. context   —— 一个可以向 actions 丶mutations 中的方法参数 传递 state,commit,dispatch 值的对象，此对象 类型为 ActionContext 

**方法：**

6. addChild ——  添加子模块到当前模块中

7. getChild —— 获取子模块

8. forEachMutation  —— 当 注册当前模块 mutations 到 store 时，把 模块的 mutations 对象中所有方法 解析 成 方法名到方法的映射这一部分功能。

9. forEachAction ——  当 注册当前模块 actions 到 store 时，把  模块的actions  对象中所有方法 解析 成 方法名到方法的映射这一部分功能。

10. forEachGetter —— 当注册当前模块 getters 到 store 时，把  模块的 getters  对象中所有方法 解析 成 方法名到方法的映射这一部分功能。

11 forEachChild —— 在完成子模块 mutation丶actions丶getters 到 store 的注册之前，把所有的子模块 解析成 模块名到模块的映射这一部分功能



**installModule** 方法

此方法为模块注册方法

 初始化根模块,递归注册所有子模块， 收集此内的所有模块 getter，mutations，actions方法

就是把根模块和子模块 state 对象中的数据 和 mutations,actions,getters 对象中 方法全部收集到 store 对象中，**installModule** 主要完成 ：

1. 判断所有模块中是否有重复的命名空间  

2. 收集当前模块的 state, 并保存到父级模块的 state 中

3. 调用 makeLocalContext 方法，创建 ActionContext 类型的对象

4. 注册当前模块 mutations 到 store 

5. 注册当前模块 actions 到 store 

6. 注册当前模块 getters 到 store 

7. 迭代当前模块下的所有子模块时，并完成子模块 mutation、actions、getters 到 store 的注册。



**makeLocalContext 方法**

此方法生成模块 ActionContext 类型的 对象，对象属性主要包括 dispatch，commit ，state 三部分

方法返回的对象 主要向 actions 、mutations 中的方法参数 传递 state，commit，dispatch 值。



**慕课网 TS 高级课程**

**12-6    【 手写  TS 版 Vuex4 源码 】 构建 Store  架构 及 诸多相关代码** **【本节视频编号为12-7】**

**Store  架构 及 诸多相关代码**

小思考:  Vuex 源码为什么都写在一个 ts 文件 里？按类别分层好吗？

```js
//  课堂 src/vuex/indexanother.ts 文件代码
import { inject, App } from 'vue';
var storeKey = 'store';
export function useStore<S = any>(): Store<S> {
  return inject(storeKey) as any
}

export interface StoreOptions<S> {
  getters?: GetterTree<S, S>;
  state?: S,
  actions?: ActionTree<S, S>;
  mutations?: MutationTree<S>;
  modules?: ModuleTree<S>;
}

interface ModuleTree<R> {
  [key: string]: Module<any, R>
}

interface Module<S, R> {
  namespaced?: boolean;
  //state?: S | (() => S);
  state?: S;
  actions?: ActionTree<S, R>;
  mutations?: MutationTree<S>;
  modules?: ModuleTree<R>
  getters?: GetterTree<S, R>
}

// GetterTree接口和相关
type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any
interface GetterTree<S, R> {
  [key: string]: Getter<S, R>
}
// ActionTree接口和相关
type Action<S, R> = (injectee: ActionContext<S, R>, payload?: any) => any
interface ActionTree<S, R> {
  [key: string]: Action<S, R>
}
export interface ActionContext<S, R> {
  dispatch: Dispatch;
  commit: Commit;
  state: S
}
// MutationTree开始
interface MutationTree<S> {
  [key: string]: Mutation<S>
}
type Mutation<S> = (state: S, payload?: any) => any;

export type Commit = (type: string, payload?: any, options?: any) => void
export type Dispatch = (type: string, payload?: any, options?: any) => any
class Store<S>{
  constructor(options: StoreOptions<S>) {
    console.log("options:", options);
  }

  install(app: App): void {
    console.log("install store to app....");
    app.provide(storeKey, this);
  }

}

export function createStore<S>(options: StoreOptions<S>) {
  return new Store<S>(options)
}
```

**慕课网 TS 高级课程**

##### **12-7   【 手写  TS 版 Vuex4 源码 】单模块源码和应用+Vue3组件整合输出** 【本节视频编号为 12-8】

```js
// 课堂 src/store/indexanother.ts 文件源码
import { createStore } from '@/vuex4/indexanother'
import { RootState } from './rootstate'
import { foodSortModule, hotelSortModule, } from './modulecollection'

export default createStore({
  state: {
    navList: ["这是一个单模块的测试state", "ok"]
  },
  getters: {
    showNavList(state) {
      return state.navList
    }
  },
  mutations: {
    findNavList(state, navList) {
      return state.navList = navList
    }
  },
  actions: {
    findNavList({commit}) {
      setTimeout(()=>{
          let navList=["abc","bc"]
          commit("findNavList",navList)
      })
    }
  }
})
```

**慕课网 TS 高级课程**

**12-9    【 手写  TS 版 Vuex4 源码 】多模块源码和应用+Vue3组件整合输出**

1. StoreOptions 接口增加多模块管理属性   2. 创建  ModuleWrapper 类   3. 创建 ModuleCollection 类

```js
// 视频 12-9-1——12-9-5 对应的课堂文件，目录为: src/Vuex4/index12-9.ts文件源码
import { App, inject } from 'vue'
const injectKey = "store"
export function useStore<S>(): Store<S> {
  return inject(injectKey) as any
}
export function createStore<S>(options: StoreOptions<S>) {
  return new Store<S>(options)
}

class Store<S = any>{
  moduleCollection: ModuleCollection<S>
  constructor(options: StoreOptions<S>) {
    console.log("options:", options)
    this.moduleCollection = new ModuleCollection<S>(options)
  }
  install(app: App) {
    app.provide(injectKey, this)
  }
  test() {
    return "我是store";
  }
}

class ModuleCollection<R>{
  root!: ModuleWrapper<any, R>
  constructor(rawRootModule: Module<any, R>) {
    this.register([], rawRootModule)
  }
  register(path: string[], rawModule: Module<any, R>) {
    let newModule = new ModuleWrapper<any, R>(rawModule)
    if (path.length === 0) {// path长度等于0 为根模块
      this.root = newModule
    } else {// 添加子模块到父级模块中
      console.log("开始添加子模块到父级模块中");

      console.log("1.先获取父级ModuleWrapper对象:", parent);
      let parentModule = this.get(path.slice(0, -1))
      console.log("2.添加子模块【添加格式：(path——子模块命名空间)-子模块】:");
      parentModule.addChild(path[path.length - 1], newModule)
      console.log("=====================");
    }
    if (rawModule.modules) {
      let sonModules = rawModule.modules
      Object.keys(sonModules).forEach(key => {
        this.register(path.concat(key), sonModules[key])
      })
    }
  }

  get(path: string[]) {
    let module = this.root;
    return path.reduce((moduleWrapper: ModuleWrapper<any, R>, key: string) => {
      return module.getChild(key)
    }, module)
  }
}

class ModuleWrapper<S, R>{
  children: Record<string, ModuleWrapper<any, R>> = {}
  rawModule: Module<any, R>
  state: S
  namespaced: boolean
  constructor(rawModule_: Module<any, R>) {
    this.rawModule = rawModule_
    this.state = rawModule_.state || Object.create(null)
    this.namespaced = rawModule_.namespaced || false
  }
  addChild(key: string, moduleWrapper: ModuleWrapper<any, R>) {
    this.children[key] = moduleWrapper
  }
  getChild(key: string) {
    return this.children[key]
  }
}

// 1. StoreOptions 接口增加多模块管理属性 start
interface StoreOptions<S> {
  state?: S;
  getters?: GetterTree<S, S>;
  mutations?: MutationTree<S>;
  actions?: ActionTree<S, S>
  modules?: ModuleTree<S>
}

interface ModuleTree<R> {
  [key: string]: Module<any, R>
}
interface Module<S, R> {
  namespaced?: boolean;
  state?: S;
  getters?: GetterTree<S, R>;
  mutations?: MutationTree<S>;
  actions?: ActionTree<S, R>;
  modules?: ModuleTree<R>
}
// 1.StoreOptions 接口增加多模块管理属性  end 
// ActionContext
interface ActionContext<S, R> {
  dispatch: Dispatch;
  commit: Commit;
  state: S;
}
type Dispatch = (type: string, payload?: any) => any
type Commit = (type: string, payload?: any) => any
// ActionTree
interface ActionTree<S, R> {
  [key: string]: Action<S, R>
}
type Action<S, R> = (context: ActionContext<S, R>, payload?: any) => any
// MutationTree
interface MutationTree<S> {
  [key: string]: Mutation<S>
}
type Mutation<S> = (state: S, payload?: any) => void
// GetterTree
interface GetterTree<S, R> {
  [key: string]: Getter<S, R>
}


type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any
```

**慕课网 TS 高级课程**

**12-10  【 手写  TS 版 Vuex4 源码 】 为模块注册准备——多模块源码优化**

```js
// 说明：在 12-9 基础上 优化的代码
register(path: string[], rawModule: Module<any, R>) {
    let newModule = new ModuleWrapper<any, R>(rawModule)
    if (path.length === 0) {// path长度等于0 为根模块
      this.root = newModule
    } else {// 添加子模块到父级模块中
      console.log("开始添加子模块到父级模块中");

      console.log("1.先获取父级ModuleWrapper对象:", parent);
      let parentModule = this.get(path.slice(0, -1))
      console.log("2.添加子模块【添加格式：(path——子模块命名空间)-子模块】:");
      parentModule.addChild(path[path.length - 1], newModule)
      console.log("=====================");
    }
    if (rawModule.modules) {
      let sonModules = rawModule.modules

      // Object.keys(sonModules).forEach(key => {
      //   this.register(path.concat(key), sonModules[key])
      // })
      // 在 12-9 基础上优化
      Util.forEachValue(sonModules, (key: string, modules: Module<any, R>) => {
        this.register(path.concat(key), modules)
      })
    }
  }

// 在 12-9 基础上增加的类
class Util {
  static forEachValue(obj: object, fn: Function) {
    Object.keys(obj).forEach(key => {
      fn(key, (obj as any)[key])
    })
  }
}
```

**慕课网 TS 高级课程**

##### 12-11  【 手写  TS 版 Vuex4 源码 】 commit 和 dispatch 实现

```js
// 课堂 src/vuex4/index12-11.ts文件源码
import { App, inject } from 'vue'
const injectKey = "store"
export function useStore<S>(): Store<S> {
  return inject(injectKey) as any
}
export function createStore<S>(options: StoreOptions<S>) {
  return new Store<S>(options)
}

class Store<S = any>{
  moduleCollection: ModuleCollection<S>
  mutations: Record<string, any> = {}
  actions: Record<string, any> = {}
  commit: Commit;
  dispatch: Dispatch;
  constructor(options: StoreOptions<S>) {
    console.log("options:", options)
    this.moduleCollection = new ModuleCollection<S>(options)
    var store = this;
    var ref = this;
    var commit = ref.commit_
    var dispatch = ref.dispatch_

    this.commit = function boundCommit(type: string, payload: any) {
      commit.call(store, type, payload)
    }

    this.dispatch = function boundDispatch(type: string, payload: any) {
      dispatch.call(store, type, payload)
    }
  }
  install(app: App) {
    app.provide(injectKey, this)
  }
  test() {
    return "我是store";
  }
  commit_(type: string, payload: any) {
    this.mutations[type](payload)
  }
  dispatch_(type: string, payload: any) {
    this.actions[type](payload)
  }
}

//console.error(("[vuex] unknown mutation type: " + type));

class ModuleCollection<R>{
  root!: ModuleWrapper<any, R>
  constructor(rawRootModule: Module<any, R>) {
    this.register([], rawRootModule)
  }
  register(path: string[], rawModule: Module<any, R>) {
    let newModule = new ModuleWrapper<any, R>(rawModule)
    if (path.length === 0) {// path长度等于0 为根模块
      this.root = newModule
    } else {// 添加子模块到父级模块中
      console.log("开始添加子模块到父级模块中");

      console.log("1.先获取父级ModuleWrapper对象:", parent);
      let parentModule = this.get(path.slice(0, -1))
      console.log("2.添加子模块【添加格式：(path——子模块命名空间)-子模块】:");
      parentModule.addChild(path[path.length - 1], newModule)
      console.log("=====================");
    }
    if (rawModule.modules) {
      let sonModules = rawModule.modules

      // Object.keys(sonModules).forEach(key => {
      //   this.register(path.concat(key), sonModules[key])
      // })
      Util.forEachValue(sonModules, (key: string, modules: Module<any, R>) => {
        this.register(path.concat(key), modules)
      })
    }
  }

  get(path: string[]) {
    let module = this.root;
    return path.reduce((moduleWrapper: ModuleWrapper<any, R>, key: string) => {
      return module.getChild(key)
    }, module)
  }
}

class Util {
  static forEachValue(obj: object, fn: Function) {
    Object.keys(obj).forEach(key => {
      fn(key, (obj as any)[key])
    })
  }

}

class ModuleWrapper<S, R>{
  children: Record<string, ModuleWrapper<any, R>> = {}
  rawModule: Module<any, R>
  state: S
  namespaced: boolean
  constructor(rawModule_: Module<any, R>) {
    this.rawModule = rawModule_
    this.state = rawModule_.state || Object.create(null)
    this.namespaced = rawModule_.namespaced || false
  }
  addChild(key: string, moduleWrapper: ModuleWrapper<any, R>) {
    this.children[key] = moduleWrapper
  }
  getChild(key: string) {
    return this.children[key]
  }
}



// 1. StoreOptions 接口增加多模块管理属性 start
interface StoreOptions<S> {
  state?: S;
  getters?: GetterTree<S, S>;
  mutations?: MutationTree<S>;
  actions?: ActionTree<S, S>
  modules?: ModuleTree<S>
}

interface ModuleTree<R> {
  [key: string]: Module<any, R>
}
interface Module<S, R> {
  namespaced?: boolean;
  state?: S;
  getters?: GetterTree<S, R>;
  mutations?: MutationTree<S>;
  actions?: ActionTree<S, R>;
  modules?: ModuleTree<R>
}
// 1.StoreOptions 接口增加多模块管理属性  end 
// ActionContext
interface ActionContext<S, R> {
  dispatch: Dispatch;
  commit: Commit;
  state: S;
}
type Dispatch = (type: string, payload?: any) => any
type Commit = (type: string, payload?: any) => any
// ActionTree
interface ActionTree<S, R> {
  [key: string]: Action<S, R>
}
type Action<S, R> = (context: ActionContext<S, R>, payload?: any) => any
// MutationTree
interface MutationTree<S> {
  [key: string]: Mutation<S>
}
type Mutation<S> = (state: S, payload?: any) => void
// GetterTree
interface GetterTree<S, R> {
  [key: string]: Getter<S, R>
}


type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any
```

**慕课网 TS 高级课程**

##### 12-12  【 手写  TS 版 Vuex4 源码 】  commit 和 dispatch  优化

```js
// 课堂 src/vuex4/index12-11.ts文件源码

import { App, inject } from 'vue'
const injectKey = "store"
export function useStore<S>(): Store<S> {
  return inject(injectKey) as any
}
export function createStore<S>(options: StoreOptions<S>) {
  return new Store<S>(options)
}

class Store<S = any>{
  moduleCollection: ModuleCollection<S>
  mutations: Record<string, any> = {}
  actions: Record<string, any> = {}
  commit: Commit;
  dispatch: Dispatch;
  constructor(options: StoreOptions<S>) {
    console.log("options:", options)
    this.moduleCollection = new ModuleCollection<S>(options)
    var store = this;
    var ref = this;
    var commit = ref.commit_
    var dispatch = ref.dispatch_

    this.commit = function boundCommit(type: string, payload: any) {
      commit.call(store, type, payload)
    }

    this.dispatch = function boundDispatch(type: string, payload: any) {
      dispatch.call(store, type, payload)
    }
  }
  install(app: App) {
    app.provide(injectKey, this)
  }
  test() {
    return "我是store";
  }
  commit_(type: string, payload: any) {
    if (!this.mutations[type]) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    this.mutations[type](payload)
  }
  dispatch_(type: string, payload: any) {
    if (!this.actions[type]) {
      console.error(("[vuex] unknown actions type: " + type));
    }
    this.actions[type](payload)
  }
}

//console.error(("[vuex] unknown mutation type: " + type));

class ModuleCollection<R>{
  root!: ModuleWrapper<any, R>
  constructor(rawRootModule: Module<any, R>) {
    this.register([], rawRootModule)
  }
  register(path: string[], rawModule: Module<any, R>) {
    let newModule = new ModuleWrapper<any, R>(rawModule)
    if (path.length === 0) {// path长度等于0 为根模块
      this.root = newModule
    } else {// 添加子模块到父级模块中
      console.log("开始添加子模块到父级模块中");

      console.log("1.先获取父级ModuleWrapper对象:", parent);
      let parentModule = this.get(path.slice(0, -1))
      console.log("2.添加子模块【添加格式：(path——子模块命名空间)-子模块】:");
      parentModule.addChild(path[path.length - 1], newModule)
      console.log("=====================");
    }
    if (rawModule.modules) {
      let sonModules = rawModule.modules

      // Object.keys(sonModules).forEach(key => {
      //   this.register(path.concat(key), sonModules[key])
      // })
      Util.forEachValue(sonModules, (key: string, modules: Module<any, R>) => {
        this.register(path.concat(key), modules)
      })
    }
  }

  get(path: string[]) {
    let module = this.root;
    return path.reduce((moduleWrapper: ModuleWrapper<any, R>, key: string) => {
      return module.getChild(key)
    }, module)
  }
}

class Util {
  static forEachValue(obj: object, fn: Function) {
    Object.keys(obj).forEach(key => {
      fn(key, (obj as any)[key])
    })
  }

}

class ModuleWrapper<S, R>{
  children: Record<string, ModuleWrapper<any, R>> = {}
  rawModule: Module<any, R>
  state: S
  namespaced: boolean
  constructor(rawModule_: Module<any, R>) {
    this.rawModule = rawModule_
    this.state = rawModule_.state || Object.create(null)
    this.namespaced = rawModule_.namespaced || false
  }
  addChild(key: string, moduleWrapper: ModuleWrapper<any, R>) {
    this.children[key] = moduleWrapper
  }
  getChild(key: string) {
    return this.children[key]
  }
}



// 1. StoreOptions 接口增加多模块管理属性 start
interface StoreOptions<S> {
  state?: S;
  getters?: GetterTree<S, S>;
  mutations?: MutationTree<S>;
  actions?: ActionTree<S, S>
  modules?: ModuleTree<S>
}

interface ModuleTree<R> {
  [key: string]: Module<any, R>
}
interface Module<S, R> {
  namespaced?: boolean;
  state?: S;
  getters?: GetterTree<S, R>;
  mutations?: MutationTree<S>;
  actions?: ActionTree<S, R>;
  modules?: ModuleTree<R>
}
// 1.StoreOptions 接口增加多模块管理属性  end 
// ActionContext
interface ActionContext<S, R> {
  dispatch: Dispatch;
  commit: Commit;
  state: S;
}
type Dispatch = (type: string, payload?: any) => any
type Commit = (type: string, payload?: any) => any
// ActionTree
interface ActionTree<S, R> {
  [key: string]: Action<S, R>
}
type Action<S, R> = (context: ActionContext<S, R>, payload?: any) => any
// MutationTree
interface MutationTree<S> {
  [key: string]: Mutation<S>
}
type Mutation<S> = (state: S, payload?: any) => void
// GetterTree
interface GetterTree<S, R> {
  [key: string]: Getter<S, R>
}


type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any
```

**12-13-1——12-3-3  【 手写  TS 版 Vuex4 源码 】模块注册—— 管理 state 源码实现**

```js
// 课堂 src/vue4x/index12-13-2.ts 文件源码
import { App, inject } from 'vue'
const injectKey = "store"
export function useStore<S>(): Store<S> {
  return inject(injectKey) as any
}
export function createStore<S>(options: StoreOptions<S>) {
  return new Store<S>(options)
}

class Store<S = any>{
  moduleCollection: ModuleCollection<S>
  mutations: Record<string, any> = {}
  actions: Record<string, any> = {}
  commit: Commit;
  dispatch: Dispatch;
  constructor(options: StoreOptions<S>) {
    console.log("options:", options)
    this.moduleCollection = new ModuleCollection<S>(options)
    var store = this;
    var ref = this;
    var commit = ref.commit_
    var dispatch = ref.dispatch_

    this.commit = function boundCommit(type: string, payload: any) {
      commit.call(store, type, payload)
    }

    this.dispatch = function boundDispatch(type: string, payload: any) {
      dispatch.call(store, type, payload)
    }
    // 注册模块
    var rootState = this.moduleCollection.root.state
    console.log("开始注册模块 installModule:");
    installModule(store, rootState, [], this.moduleCollection.root)
    console.log("模块注册完后的rootState:", rootState)
  }
  install(app: App) {
    app.provide(injectKey, this)
  }
  test() {
    return "我是store";
  }
  commit_(type: string, payload: any) {
    if (!this.mutations[type]) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    this.mutations[type](payload)
  }
  dispatch_(type: string, payload: any) {
    if (!this.actions[type]) {
      console.error(("[vuex] unknown actions type: " + type));
    }
    this.actions[type](payload)
  }
}
/**
 * 
 * @param store 
 * @param rootState_  根state
 * @param path  保存模块名【命名空间名】的数组
 * @param module 当前模块
 */
function installModule<R>(store: Store<R>, rootState_: R, path: string[],
  module: ModuleWrapper<any, R>) {

  var isRoot = !path.length
  console.log("path:", path)

  if (!isRoot) { //  1.如果不是根模块
    // 1.拿到父级的 state对象
    var parentState: Record<string, any> = getParentState(rootState_, path.slice(0, -1))
    // 2.把当前模块的 state对象 和当前模块名合成一个对象，加到父级state对象上
    parentState[path[path.length - 1]] = module.state

  }
  module.forEachChild(function (child, key) {
    installModule(store, rootState_, path.concat(key), child)
  })

}
//  ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
function getParentState<R>(rootState: R, path: string[]) {
  return path.reduce((state, key) => {
    return (state as any)[key]
  }, rootState)
}
// path: ["foodSortModule", "foodModule", "foodDetailModule"]

// rootState:
// {
//   "navList": 根state对象数据
//   "foodSortModule": {
//     foodSortList: { 美食分类对象数据 },
//     "foodModule": {
//       "美食state对象数据",
//         "foodDetailModule": { 美食详情对象数据 }
//     }
//   }

//   "hotelSortModule": 酒店分类state数据对象 //酒店分类 state

// }// rootState对象结束


//console.error(("[vuex] unknown mutation type: " + type));

class ModuleCollection<R>{
  root!: ModuleWrapper<any, R>
  constructor(rawRootModule: Module<any, R>) {
    this.register([], rawRootModule)
  }
  register(path: string[], rawModule: Module<any, R>) {
    let newModule = new ModuleWrapper<any, R>(rawModule)
    if (path.length === 0) {// path长度等于0 为根模块
      this.root = newModule
    } else {// 添加子模块到父级模块中
      console.log("开始添加子模块到父级模块中");

      console.log("1.先获取父级ModuleWrapper对象:", parent);
      let parentModule = this.get(path.slice(0, -1))
      console.log("2.添加子模块【添加格式：(path——子模块命名空间)-子模块】:");
      parentModule.addChild(path[path.length - 1], newModule)
      console.log("=====================");
    }
    if (rawModule.modules) {
      let sonModules = rawModule.modules

      // Object.keys(sonModules).forEach(key => {
      //   this.register(path.concat(key), sonModules[key])
      // })
      Util.forEachValue(sonModules, (key: string, modules: Module<any, R>) => {
        this.register(path.concat(key), modules)
      })
    }
  }

  get(path: string[]) {
    let module = this.root;
    return path.reduce((moduleWrapper: ModuleWrapper<any, R>, key: string) => {
      return module.getChild(key)
    }, module)
  }
}

class Util {
  static forEachValue(obj: object, fn: Function) {
    Object.keys(obj).forEach(key => {
      fn(key, (obj as any)[key])
    })
  }

}

class ModuleWrapper<S, R>{
  children: Record<string, ModuleWrapper<any, R>> = {}
  rawModule: Module<any, R>
  state: S
  namespaced: boolean
  constructor(rawModule_: Module<any, R>) {
    this.rawModule = rawModule_
    this.state = rawModule_.state || Object.create(null)
    this.namespaced = rawModule_.namespaced || false
  }
  addChild(key: string, moduleWrapper: ModuleWrapper<any, R>) {
    this.children[key] = moduleWrapper
  }
  getChild(key: string) {
    return this.children[key]
  }
  forEachChild(fn: ChldMdleWrperToKey<R>) {
    Object.keys(this.children).forEach(key => {
      fn(this.children[key], key)
    })
  }
}

type ChldMdleWrperToKey<R> = (moduleWrapper: ModuleWrapper<any, R>, key: string) => void


// 1. StoreOptions 接口增加多模块管理属性 start
interface StoreOptions<S> {
  state?: S;
  getters?: GetterTree<S, S>;
  mutations?: MutationTree<S>;
  actions?: ActionTree<S, S>
  modules?: ModuleTree<S>
}

interface ModuleTree<R> {
  [key: string]: Module<any, R>
}
interface Module<S, R> {
  namespaced?: boolean;
  state?: S;
  getters?: GetterTree<S, R>;
  mutations?: MutationTree<S>;
  actions?: ActionTree<S, R>;
  modules?: ModuleTree<R>
}
// 1.StoreOptions 接口增加多模块管理属性  end 
// ActionContext
interface ActionContext<S, R> {
  dispatch: Dispatch;
  commit: Commit;
  state: S;
}
type Dispatch = (type: string, payload?: any) => any
type Commit = (type: string, payload?: any) => any
// ActionTree
interface ActionTree<S, R> {
  [key: string]: Action<S, R>
}
type Action<S, R> = (context: ActionContext<S, R>, payload?: any) => any
// MutationTree
interface MutationTree<S> {
  [key: string]: Mutation<S>
}
type Mutation<S> = (state: S, payload?: any) => void
// GetterTree
interface GetterTree<S, R> {
  [key: string]: Getter<S, R>
}


type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any
```

**12-13-4  【 手写  TS 版 Vuex4 源码 】12-13 作业——模块名和父级state数据重名如何解决？**

```js
作业产生背景：开发时经常有模块名和父级state数据重名，如何解决呢？例如：
export default createStore<RootState>({
  state: {
    navList: [10, 30, 40]
  },
  modules: {

    foodSortModule: foodSortModule,
    navList: hotelSortModule

  }
})
```

**12-14  【 手写  TS 版 Vuex4 源码 】模块注册——注册 getters**

```js

import { App, inject } from 'vue'
const injectKey = "store"
export function useStore<S>(): Store<S> {
  return inject(injectKey) as any
}
export function createStore<S>(options: StoreOptions<S>) {
  return new Store<S>(options)
}

class Store<S = any>{
  moduleCollection: ModuleCollection<S>
  mutations: Record<string, any> = {}
  actions: Record<string, any> = {}
  getters: GetterTree<any, S> = {}
  commit: Commit;
  dispatch: Dispatch;
  constructor(options: StoreOptions<S>) {
    console.log("options:", options)
    this.moduleCollection = new ModuleCollection<S>(options)
    var store = this;
    var ref = this;
    var commit = ref.commit_
    var dispatch = ref.dispatch_

    this.commit = function boundCommit(type: string, payload: any) {
      commit.call(store, type, payload)
    }

    this.dispatch = function boundDispatch(type: string, payload: any) {
      dispatch.call(store, type, payload)
    }
    // 注册模块
    var rootState = this.moduleCollection.root.state
    console.log("开始注册模块 installModule:");
    installModule(store, rootState, [], this.moduleCollection.root)
    console.log("模块注册完后的rootState:", rootState)
  }
  install(app: App) {
    app.provide(injectKey, this)
  }
  test() {
    return "我是store";
  }
  commit_(type: string, payload: any) {
    if (!this.mutations[type]) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    this.mutations[type](payload)
  }
  dispatch_(type: string, payload: any) {
    if (!this.actions[type]) {
      console.error(("[vuex] unknown actions type: " + type));
    }
    this.actions[type](payload)
  }
}
/**
 * 
 * @param store 
 * @param rootState_  根state
 * @param path  保存模块名【命名空间名】的数组
 * @param module 当前模块
 */
function installModule<R>(store: Store<R>, rootState_: R, path: string[],
  module: ModuleWrapper<any, R>) {

  var isRoot = !path.length
  console.log("path:", path)
  let namespace = store.moduleCollection.getNamespace(path);
  console.log("installModule namespace 哈哈:", namespace)
  //let namespace = module.getNamespace(path)
  if (!isRoot) { //  1.如果不是根模块
    // 1.拿到父级的 state对象
    var parentState: Record<string, any> = getParentState(rootState_, path.slice(0, -1))
    // 2.把当前模块的 state对象 和当前模块名合成一个对象，加到父级state对象上
    parentState[path[path.length - 1]] = module.state

  }
  module.forEachChild(function (child, key) {
    installModule(store, rootState_, path.concat(key), child)
  })
  module.forEachGetter(function (getter, key) {
    let namespaceType = namespace + key
    //store.getters[namespaceType] = getter
    Object.defineProperty(store.getters, namespaceType, {
      get: () => {
        return getter(module.state)
      }
    })
  })

}
//  ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
function getParentState<R>(rootState: R, path: string[]) {
  return path.reduce((state, key) => {
    return (state as any)[key]
  }, rootState)
}
// path: ["foodSortModule", "foodModule", "foodDetailModule"]

// rootState:
// {
//   "navList": 根state对象数据
//   "foodSortModule": {
//     foodSortList: { 美食分类对象数据 },
//     "foodModule": {
//       "美食state对象数据",
//         "foodDetailModule": { 美食详情对象数据 }
//     }
//   }

//   "hotelSortModule": 酒店分类state数据对象 //酒店分类 state

// }// rootState对象结束


//console.error(("[vuex] unknown mutation type: " + type));

class ModuleCollection<R>{
  root!: ModuleWrapper<any, R>
  constructor(rawRootModule: Module<any, R>) {
    this.register([], rawRootModule)
  }
  register(path: string[], rawModule: Module<any, R>) {
    let newModule = new ModuleWrapper<any, R>(rawModule)
    if (path.length === 0) {// path长度等于0 为根模块
      this.root = newModule
    } else {// 添加子模块到父级模块中
      console.log("开始添加子模块到父级模块中");

      console.log("1.先获取父级ModuleWrapper对象:", parent);
      let parentModule = this.get(path.slice(0, -1))
      console.log("2.添加子模块【添加格式：(path——子模块命名空间)-子模块】:");
      parentModule.addChild(path[path.length - 1], newModule)
      console.log("=====================");
    }
    if (rawModule.modules) {
      let sonModules = rawModule.modules

      // Object.keys(sonModules).forEach(key => {
      //   this.register(path.concat(key), sonModules[key])
      // })
      Util.forEachValue(sonModules, (key: string, modules: Module<any, R>) => {
        this.register(path.concat(key), modules)
      })
    }
  }

  get(path: string[]) {
    let module = this.root;
    return path.reduce((moduleWrapper: ModuleWrapper<any, R>, key: string) => {
      return module.getChild(key)
    }, module)
  }

  getNamespace(path: string[]) {
    let moduleWrapper = this.root
    return path.reduce(function (namespace, key) {
      moduleWrapper = moduleWrapper.getChild(key)
      return namespace + (moduleWrapper.namespaced ? key + "/" : '')
    }, '')
  }
}

class Util {
  static forEachValue(obj: object, fn: Function) {
    Object.keys(obj).forEach(key => {
      fn(key, (obj as any)[key])
    })
  }

}

class ModuleWrapper<S, R>{
  children: Record<string, ModuleWrapper<any, R>> = {}
  rawModule: Module<any, R>
  state: S
  namespaced: boolean
  constructor(rawModule_: Module<any, R>) {
    this.rawModule = rawModule_
    this.state = rawModule_.state || Object.create(null)
    this.namespaced = rawModule_.namespaced || false
  }
  addChild(key: string, moduleWrapper: ModuleWrapper<any, R>) {
    this.children[key] = moduleWrapper
  }
  getChild(key: string) {
    return this.children[key]
  }
  forEachChild(fn: ChldMdleWrperToKey<R>) {
    Object.keys(this.children).forEach(key => {
      fn(this.children[key], key)
    })
  }

  forEachGetter(fn: GetterToKey<R>) {
    if (this.rawModule.getters) {
      Object.keys(this.rawModule.getters).forEach(key => {
        fn((this.rawModule.getters as any)[key], key)
      })
    }
  }

}

type GetterToKey<R> = (getter: Getter<any, R>, key: string) => any
type ChldMdleWrperToKey<R> = (moduleWrapper: ModuleWrapper<any, R>, key: string) => void


// 1. StoreOptions 接口增加多模块管理属性 start
interface StoreOptions<S> {
  state?: S;
  getters?: GetterTree<S, S>;
  mutations?: MutationTree<S>;
  actions?: ActionTree<S, S>
  modules?: ModuleTree<S>
}

interface ModuleTree<R> {
  [key: string]: Module<any, R>
}
export interface Module<S, R> {
  namespaced?: boolean;
  state?: S;
  getters?: GetterTree<S, R>;
  mutations?: MutationTree<S>;
  actions?: ActionTree<S, R>;
  modules?: ModuleTree<R>
}
// 1.StoreOptions 接口增加多模块管理属性  end 
// ActionContext
interface ActionContext<S, R> {
  dispatch: Dispatch;
  commit: Commit;
  state: S;
}
type Dispatch = (type: string, payload?: any) => any
type Commit = (type: string, payload?: any) => any
// ActionTree
interface ActionTree<S, R> {
  [key: string]: Action<S, R>
}
type Action<S, R> = (context: ActionContext<S, R>, payload?: any) => any
// MutationTree
interface MutationTree<S> {
  [key: string]: Mutation<S>
}
type Mutation<S> = (state: S, payload?: any) => void
// GetterTree
interface GetterTree<S, R> {
  [key: string]: Getter<S, R>
}


//type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any
type Getter<S, R> = (state: S) => any
```



**慕课网 TS 高级课程** 

##### 12-15  【 手写  TS 版 Vuex4 源码 】模块注册——注册 mutations  

```js

import { App, inject } from 'vue'
const injectKey = "store"
export function useStore<S>(): Store<S> {
  return inject(injectKey) as any
}
export function createStore<S>(options: StoreOptions<S>) {
  return new Store<S>(options)
}

class Store<S = any>{
  moduleCollection: ModuleCollection<S>
  mutations: Record<string, any> = {}
  actions: Record<string, any> = {}
  getters: GetterTree<any, S> = {}
  commit: Commit;
  dispatch: Dispatch;
  constructor(options: StoreOptions<S>) {
    console.log("options:", options)
    this.moduleCollection = new ModuleCollection<S>(options)
    var store = this;
    var ref = this;
    var commit = ref.commit_
    var dispatch = ref.dispatch_

    this.commit = function boundCommit(type: string, payload: any) {
      commit.call(store, type, payload)
    }

    this.dispatch = function boundDispatch(type: string, payload: any) {
      dispatch.call(store, type, payload)
    }
    // 注册模块
    var rootState = this.moduleCollection.root.state
    console.log("开始注册模块 installModule:");
    installModule(store, rootState, [], this.moduleCollection.root)
    console.log("模块注册完后的rootState:", rootState)
  }
  install(app: App) {
    app.provide(injectKey, this)
  }
  test() {
    return "我是store";
  }
  commit_(type: string, payload: any) {
    if (!this.mutations[type]) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    this.mutations[type](payload)
  }
  dispatch_(type: string, payload: any) {
    if (!this.actions[type]) {
      console.error(("[vuex] unknown actions type: " + type));
    }
    this.actions[type](payload)
  }
}
/**
 * 
 * @param store 
 * @param rootState_  根state
 * @param path  保存模块名【命名空间名】的数组
 * @param module 当前模块
 */
function installModule<R>(store: Store<R>, rootState_: R, path: string[],
  module: ModuleWrapper<any, R>) {

  var isRoot = !path.length
  console.log("path:", path)
  let namespace = store.moduleCollection.getNamespace(path);
  console.log("installModule namespace 哈哈:", namespace)
  //let namespace = module.getNamespace(path)
  if (!isRoot) { //  1.如果不是根模块
    // 1.拿到父级的 state对象
    var parentState: Record<string, any> = getParentState(rootState_, path.slice(0, -1))
    // 2.把当前模块的 state对象 和当前模块名合成一个对象，加到父级state对象上
    parentState[path[path.length - 1]] = module.state

  }
  module.forEachChild(function (child, key) {
    installModule(store, rootState_, path.concat(key), child)
  })
  module.forEachGetter(function (getter, key) {
    let namespaceType = namespace + key
    //store.getters[namespaceType] = getter
    Object.defineProperty(store.getters, namespaceType, {
      get: () => {
        return getter(module.state)
      }
    })
  })
  module.forEachMutation(function (mutation, key) {
    let namespaceType = namespace + key
    store.mutations[namespaceType] = function (payload: any) {
      //mutation(module.state, payload)
      mutation.call(store, module.state, payload)
    }
  })
}
//  ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
function getParentState<R>(rootState: R, path: string[]) {
  return path.reduce((state, key) => {
    return (state as any)[key]
  }, rootState)
}
// path: ["foodSortModule", "foodModule", "foodDetailModule"]

// rootState:
// {
//   "navList": 根state对象数据
//   "foodSortModule": {
//     foodSortList: { 美食分类对象数据 },
//     "foodModule": {
//       "美食state对象数据",
//         "foodDetailModule": { 美食详情对象数据 }
//     }
//   }

//   "hotelSortModule": 酒店分类state数据对象 //酒店分类 state

// }// rootState对象结束


//console.error(("[vuex] unknown mutation type: " + type));

class ModuleCollection<R>{
  root!: ModuleWrapper<any, R>
  constructor(rawRootModule: Module<any, R>) {
    this.register([], rawRootModule)
  }
  register(path: string[], rawModule: Module<any, R>) {
    let newModule = new ModuleWrapper<any, R>(rawModule)
    if (path.length === 0) {// path长度等于0 为根模块
      this.root = newModule
    } else {// 添加子模块到父级模块中
      console.log("开始添加子模块到父级模块中");

      console.log("1.先获取父级ModuleWrapper对象:", parent);
      let parentModule = this.get(path.slice(0, -1))
      console.log("2.添加子模块【添加格式：(path——子模块命名空间)-子模块】:");
      parentModule.addChild(path[path.length - 1], newModule)
      console.log("=====================");
    }
    if (rawModule.modules) {
      let sonModules = rawModule.modules

      // Object.keys(sonModules).forEach(key => {
      //   this.register(path.concat(key), sonModules[key])
      // })
      Util.forEachValue(sonModules, (modules: Module<any, R>, key: string) => {
        this.register(path.concat(key), modules)
      })
    }
  }

  get(path: string[]) {
    let module = this.root;
    return path.reduce((moduleWrapper: ModuleWrapper<any, R>, key: string) => {
      return module.getChild(key)
    }, module)
  }

  getNamespace(path: string[]) {
    let moduleWrapper = this.root
    return path.reduce(function (namespace, key) {
      moduleWrapper = moduleWrapper.getChild(key)
      return namespace + (moduleWrapper.namespaced ? key + "/" : '')
    }, '')
  }
}

class Util {
  static forEachValue(obj: object, fn: Function) {
    Object.keys(obj).forEach(key => {
      fn((obj as any)[key], key)
    })
  }

}

class ModuleWrapper<S, R>{
  children: Record<string, ModuleWrapper<any, R>> = {}
  rawModule: Module<any, R>
  state: S
  namespaced: boolean
  constructor(rawModule_: Module<any, R>) {
    this.rawModule = rawModule_
    this.state = rawModule_.state || Object.create(null)
    this.namespaced = rawModule_.namespaced || false
  }
  addChild(key: string, moduleWrapper: ModuleWrapper<any, R>) {
    this.children[key] = moduleWrapper
  }
  getChild(key: string) {
    return this.children[key]
  }
  forEachChild(fn: ChldMdleWrperToKey<R>) {
    Util.forEachValue(this.children, fn);
  }

  forEachGetter(fn: GetterToKey<R>) {
    if (this.rawModule.getters) {
      Util.forEachValue(this.rawModule.getters, fn)
    }
  }
  forEachMutation(fn: MutationToKey<S>) {
    if (this.rawModule.mutations) {
      Util.forEachValue(this.rawModule.mutations, fn)
    }
  }
}

type MutationToKey<S> = (getter: Mutation<S>, key: string) => any
type GetterToKey<R> = (getter: Getter<any, R>, key: string) => any
type ChldMdleWrperToKey<R> = (moduleWrapper: ModuleWrapper<any, R>, key: string) => void


// 1. StoreOptions 接口增加多模块管理属性 start
interface StoreOptions<S> {
  state?: S;
  getters?: GetterTree<S, S>;
  mutations?: MutationTree<S>;
  actions?: ActionTree<S, S>
  modules?: ModuleTree<S>
}

interface ModuleTree<R> {
  [key: string]: Module<any, R>
}
export interface Module<S, R> {
  namespaced?: boolean;
  state?: S;
  getters?: GetterTree<S, R>;
  mutations?: MutationTree<S>;
  actions?: ActionTree<S, R>;
  modules?: ModuleTree<R>
}
// 1.StoreOptions 接口增加多模块管理属性  end 
// ActionContext
interface ActionContext<S, R> {
  dispatch: Dispatch;
  commit: Commit;
  state: S;
}
type Dispatch = (type: string, payload?: any) => any
type Commit = (type: string, payload?: any) => any
// ActionTree
interface ActionTree<S, R> {
  [key: string]: Action<S, R>
}
type Action<S, R> = (context: ActionContext<S, R>, payload?: any) => any
// MutationTree
interface MutationTree<S> {
  [key: string]: Mutation<S>
}
type Mutation<S> = (state: S, payload?: any) => void
// GetterTree
interface GetterTree<S, R> {
  [key: string]: Getter<S, R>
}


//type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any
type Getter<S, R> = (state: S) => any
```

**12-16  【 手写  TS 版 Vuex4 源码 】模块注册——注册 actions**   

```js

import { App, inject } from 'vue'
const injectKey = "store"
export function useStore<S>(): Store<S> {
  return inject(injectKey) as any
}
export function createStore<S>(options: StoreOptions<S>) {
  return new Store<S>(options)
}

class Store<S = any>{
  moduleCollection: ModuleCollection<S>
  mutations: Record<string, any> = {}
  actions: Record<string, any> = {}
  getters: GetterTree<any, S> = {}
  commit: Commit;
  dispatch: Dispatch;
  constructor(options: StoreOptions<S>) {
    console.log("options:", options)
    this.moduleCollection = new ModuleCollection<S>(options)
    var store = this;
    var ref = this;
    var commit = ref.commit_
    var dispatch = ref.dispatch_

    this.commit = function boundCommit(type: string, payload: any) {
      commit.call(store, type, payload)
    }

    this.dispatch = function boundDispatch(type: string, payload: any) {
      dispatch.call(store, type, payload)
    }
    // 注册模块
    var rootState = this.moduleCollection.root.state
    console.log("开始注册模块 installModule:");
    installModule(store, rootState, [], this.moduleCollection.root)
    console.log("模块注册完后的rootState:", rootState)
  }
  install(app: App) {
    app.provide(injectKey, this)
  }
  test() {
    return "我是store";
  }
  commit_(type: string, payload: any) {
    if (!this.mutations[type]) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    console.log("commit:type:", type);
    this.mutations[type](payload)
  }
  dispatch_(type: string, payload: any) {
    if (!this.actions[type]) {
      console.error(("[vuex] unknown actions type: " + type));
    }
    this.actions[type](payload)
  }
}
/**
 * 
 * @param store 
 * @param rootState_  根state
 * @param path  保存模块名【命名空间名】的数组
 * @param module 当前模块
 */
function installModule<R>(store: Store<R>, rootState_: R, path: string[],
  module: ModuleWrapper<any, R>) {

  var isRoot = !path.length
  console.log("path:", path)
  
  let namespace = store.moduleCollection.getNamespace(path);
  console.log("installModule namespace 哈哈:", namespace)

  //let namespace = module.getNamespace(path)
  if (!isRoot) { //  1.如果不是根模块
    // 1.拿到父级的 state对象
    var parentState: Record<string, any> = getParentState(rootState_, path.slice(0, -1))
    // 2.把当前模块的 state对象 和当前模块名合成一个对象，加到父级state对象上
    parentState[path[path.length - 1]] = module.state

  }
  module.forEachChild(function (child, key) {
    installModule(store, rootState_, path.concat(key), child)
  })
  module.forEachGetter(function (getter, key) {
    let namespaceType = namespace + key
    //store.getters[namespaceType] = getter
    Object.defineProperty(store.getters, namespaceType, {
      get: () => {
        return getter(module.state)
      }
    })
  })
  module.forEachMutation(function (mutation, key) {
    let namespaceType = namespace + key
    store.mutations[namespaceType] = function (payload: any) {
      mutation.call(store, module.state, payload)
    }
  })

  module.forEachAction(function (action, key) {
    let namespaceType = namespace + key
    store.actions[namespaceType] = function (payload: any) {
      //action({ commit: store.commit }, payload)
      action.call(store, { commit: store.commit }, payload)
    }
  })
}


function getParentState<R>(rootState: R, path: string[]) {
  return path.reduce((state, key) => {
    return (state as any)[key]
  }, rootState)
}
// path: ["foodSortModule", "foodModule", "foodDetailModule"]

// rootState:
// {
//   "navList": 根state对象数据
//   "foodSortModule": {
//     foodSortList: { 美食分类对象数据 },
//     "foodModule": {
//       "美食state对象数据",
//         "foodDetailModule": { 美食详情对象数据 }
//     }
//   }

//   "hotelSortModule": 酒店分类state数据对象 //酒店分类 state

// }// rootState对象结束


//console.error(("[vuex] unknown mutation type: " + type));

class ModuleCollection<R>{
  root!: ModuleWrapper<any, R>
  constructor(rawRootModule: Module<any, R>) {
    this.register([], rawRootModule)
  }
  register(path: string[], rawModule: Module<any, R>) {
    let newModule = new ModuleWrapper<any, R>(rawModule)
    if (path.length === 0) {// path长度等于0 为根模块
      this.root = newModule
    } else {// 添加子模块到父级模块中
      console.log("开始添加子模块到父级模块中");

      console.log("1.先获取父级ModuleWrapper对象:", parent);
      let parentModule = this.get(path.slice(0, -1))
      console.log("2.添加子模块【添加格式：(path——子模块命名空间)-子模块】:");
      parentModule.addChild(path[path.length - 1], newModule)
      console.log("=====================");
    }
    if (rawModule.modules) {
      let sonModules = rawModule.modules

      // Object.keys(sonModules).forEach(key => {
      //   this.register(path.concat(key), sonModules[key])
      // })
      Util.forEachValue(sonModules, (modules: Module<any, R>, key: string) => {
        this.register(path.concat(key), modules)
      })
    }
  }

  get(path: string[]) {
    let module = this.root;
    return path.reduce((moduleWrapper: ModuleWrapper<any, R>, key: string) => {
      return module.getChild(key)
    }, module)
  }

  getNamespace(path: string[]) {
    let moduleWrapper = this.root
    return path.reduce(function (namespace, key) {
      moduleWrapper = moduleWrapper.getChild(key)
      return namespace + (moduleWrapper.namespaced ? key + "/" : '')
    }, '')
  }
}

class Util {
  static forEachValue(obj: object, fn: Function) {
    Object.keys(obj).forEach(key => {
      fn((obj as any)[key], key)
    })
  }

}

class ModuleWrapper<S, R>{
  children: Record<string, ModuleWrapper<any, R>> = {}
  rawModule: Module<any, R>
  state: S
  namespaced: boolean
  constructor(rawModule_: Module<any, R>) {
    this.rawModule = rawModule_
    this.state = rawModule_.state || Object.create(null)
    this.namespaced = rawModule_.namespaced || false
  }
  addChild(key: string, moduleWrapper: ModuleWrapper<any, R>) {
    this.children[key] = moduleWrapper
  }
  getChild(key: string) {
    return this.children[key]
  }
  forEachChild(fn: ChldMdleWrperToKey<R>) {
    Util.forEachValue(this.children, fn);
  }

  forEachGetter(fn: GetterToKey<R>) {
    if (this.rawModule.getters) {
      Util.forEachValue(this.rawModule.getters, fn)
    }
  }
  forEachMutation(fn: MutationToKey<S>) {
    if (this.rawModule.mutations) {
      Util.forEachValue(this.rawModule.mutations, fn)
    }
  }
  forEachAction(fn: ActionToKey<S, R>) {
    if (this.rawModule.actions) {
      Util.forEachValue(this.rawModule.actions, fn)
    }
  }

}
type ActionToKey<S, R> = (action: Action<S, R>, key: string) => any
type MutationToKey<S> = (getter: Mutation<S>, key: string) => any
type GetterToKey<R> = (getter: Getter<any, R>, key: string) => any
type ChldMdleWrperToKey<R> = (moduleWrapper: ModuleWrapper<any, R>, key: string) => void


// 1. StoreOptions 接口增加多模块管理属性 start
interface StoreOptions<S> {
  state?: S;
  getters?: GetterTree<S, S>;
  mutations?: MutationTree<S>;
  actions?: ActionTree<S, S>
  modules?: ModuleTree<S>
}

interface ModuleTree<R> {
  [key: string]: Module<any, R>
}
export interface Module<S, R> {
  namespaced?: boolean;
  state?: S;
  getters?: GetterTree<S, R>;
  mutations?: MutationTree<S>;
  actions?: ActionTree<S, R>;
  modules?: ModuleTree<R>
}
// 1.StoreOptions 接口增加多模块管理属性  end 
// ActionContext
interface ActionContext<S, R> {
  //dispatch: Dispatch;
  commit: Commit;
  //state: S;
}
type Dispatch = (type: string, payload?: any) => any
type Commit = (type: string, payload?: any) => any
// ActionTree
interface ActionTree<S, R> {
  [key: string]: Action<S, R>
}
type Action<S, R> = (context: ActionContext<S, R>, payload?: any) => any
// MutationTree
interface MutationTree<S> {
  [key: string]: Mutation<S>
}
type Mutation<S> = (state: S, payload?: any) => void
// GetterTree
interface GetterTree<S, R> {
  [key: string]: Getter<S, R>
}


//type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any
type Getter<S, R> = (state: S) => any
```

**12-16  【 手写  TS 版 Vuex4 源码 】模块注册——注册 getters**

```js
import { inject, App, reactive } from 'vue';
var storeKey = 'store';
export function useStore<S = any>(): Store<S> {
  return inject(storeKey) as any
}

// Getter
export type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any;
export interface GetterTree<S, R> {
  [key: string]: Getter<S, R>;
}

// dispatch,commit
export type Dispatch = (type: string, payload?: any, options?: any) => any;
export type Commit = (type: string, payload?: any, options?: any) => void;

//  ActionContext
interface ActionContext<S, R> {
  dispatch: Dispatch;
  commit: Commit;
  state: S;
}

// ActionTree 和 Action 
export type Action<S, R> = (injectee: ActionContext<S, R>, payload?: any) => any
export interface ActionTree<S, R> {
  [key: string]: Action<S, R>
}

// Mutation
export interface MutationTree<S> {
  [key: string]: Mutation<S>;
}
type Mutation<S> = (state: S, payload?: any) => any;

// Module
export interface ModuleTree<R> {
  [key: string]: Module<any, R>
}

export interface Module<S, R> {
  namespaced?: boolean;
  state?: S | (() => S);
  actions?: ActionTree<S, R>;
  mutations?: MutationTree<S>;
  modules?: ModuleTree<R>
  getters?: GetterTree<S, R>
}



export interface StoreOptions<S> {
  getters?: GetterTree<S, S>;
  state?: S,
  actions?: ActionTree<S, S>;
  mutations?: MutationTree<S>;
  modules?: ModuleTree<S>;
}

class Store<S> {

  // 12-8  增加 
  _moduleCollection: ModuleCollection<S>;

  constructor(options: StoreOptions<S>) {
    console.log(options);
    //  12-8  增加 
    this._moduleCollection = options ? new ModuleCollection(options) : Object.create(null);

    // 12-10 增加1 开始
    var store = this;
    var ref = this;
    var dispatch = ref.dispatch_;
    var commit = ref.commit_;
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store, type, payload)
    }
    this.commit = function boundCommit(type, payload) {
      return commit.call(store, type, payload)
    }
    // 12-10 增加1 结束
     
      // 12-12 增加4 开始
    var rootState = this._moduleCollection.root.state;
    installModule<S>(this, rootState, [],
      this._moduleCollection.root)
    // 12-12 增加4 结束  
  }

  // 12-10 增加2 开始
  dispatch: Dispatch;
  commit: Commit;
  getters: GetterTree<any, S> = {}
  _actions: Record<string, any> = {}
  _mutations: Record<string, any> = {}


  commit_(_type: any, _payload: any) {
    // 12-11 增加2 开始
    var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    console.log("哈哈....commit.type...:", type)
    console.log("哈哈..this_mutations...:", this._mutations)
    console.log("哈哈..this_mutations[type]...:",
      this._mutations[type])

    if (!this._mutations[type]) {
      {
        console.error(("[vuex] unknown mutation type: " + type));
      }
      return
    }

    this._mutations[type](ref.payload)
    //  12-11 增加2 结束
  }

  dispatch_(_type: any, _payload: any) {
    // 12-11 增加3 开始
    var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    if (!this._actions[type]) {
      {
        console.error(("[vuex] unknown actions type: " + type));
      }
      return
    }
    this._actions[type](ref.payload)
  }
  // 12-11 增加3 结束

  install(app: App): void {
    console.log("install....");
    app.provide(storeKey, this);
  }

  // 12-12  增加2开始
  _withCommit(fn: () => void) {
    fn();
  }
  // 12-12  增加2结束

  // 12-13 增加3 开始
  _state!: any;
  get state(): S {
    console.log("this._state.data:", this._state.data);
    return this._state.data
  }
  // 12-13 增加3 结束
}

// 12-12  增加1开始
function installModule<S>(store: Store<S>, rootState_: S,
  path: any[], module_: ModuleWrapper<S>) {

  var isRoot = !path.length;// 如果长度为0，那么就是根模块
  var namespace = store._moduleCollection.getNameSpace(path);

  if (!isRoot) {// 如果不是根模块
    //  查找父级模块的state
    var parentState = getNestedState(rootState_, path.slice(0, -1));
    var moduleName = path[path.length - 1]
    store._withCommit(function () {
      //  如果父级 State 中 有以当前模块名命名，就抛出错误
      if (moduleName in parentState) {
        console.warn(
          ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
        );
      }
      //  把当前模块的state用模块名【modulename】做 key 保存到父模块state【parentState】中
      (parentState as any)[moduleName] = module_.state;
    })
  }

  // 12-13 增加2 开始
  var local = module_.context = makeLocalContext(store, namespace, path);
  // 12-13 增加2 结束

  // 12-14 增加2 开始
  module_.forEachMutation(function (handler: Mutation<S>, key: string) {
    var namespaceType = namespace + key;
    registerMutation(store, namespaceType, handler, local)
  })
  // 12-14 增加2 结束

  // 12-15 增加2 开始
  module_.forEachAction(function (handler: Action<any, S>, key: string) {
    var namespaceType = namespace + key;
    registerAction(store, namespaceType, handler, local);
  })
  // 12-15 增加2 结束

  // 12-16 增加2 开始
  module_.forEachGetter(function (getter, key) {
    var namespaceType = namespace + key;
    registerGetter(store, namespaceType, getter, local)
  })
  // 12-16 增加2 开始
}
// 12-16 增加1 开始
function registerGetter<S>(store: Store<S>, type: string,
  getter: Getter<any, S>, local: any) {
  if ((store.getters as any)[type]) {
    {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  Object.defineProperty(store.getters, type, {
    get: () => {// local.state 当前state   local.getters当前getters
      //
      return getter(local.state, local.getters, store.state, store.getters)
    }
  })
}
// 12-16 增加2 结束

// 12-15 增加1 开始
function registerAction<S>(store: Store<S>, type: any,
  handler: Action<any, S>, local: ActionContext<any, S>) {
  // if (store._actions[type]) {// 如果type 类型的 action 已经存在store中
  //   return
  // }

  store._actions[type] = function (payload: any) {
    handler.call(store, {// 对应ActionContext
      dispatch: local.dispatch,
      commit: local.commit,
      state: local.state,
      //getters: local.getters,
      //rootState: store.state,
      //rootGetters: store.getters
    }, payload)
  }
}
// 12-15 增加2 结束

// 12-14 增加1 开始
function registerMutation<S>(store: Store<S>, type: any,
  handler: Mutation<S>, local: ActionContext<any, S>) {
  if (store._mutations[type]) {//如果type 类型的 mutation已经存在store中
    return// 跳过
  }
  store._mutations[type] = function (payload: any) {
    handler.call(store, local.state, payload)
  }
}
// 12-14 增加1 结束

// 12-13 增加1 开始
function makeLocalContext<S>(store: Store<S>,
  namespacename: string, path: Array<any>) {
  var noNamespace = namespacename === '';

  var local: ActionContext<any, S> = {
    dispatch: noNamespace ? store.dispatch :
      function (_type: any, _payload: any, _options: any) {
        var args = unifyObjectStyle(_type, _payload)
        var payload = args.payload
        var type = args.type;

        if (!_options || !_options.root) {
          type = namespacename + type
          console.log("type:", type)
          console.log("store._actions[type]:", store._actions[type])
          //  如果 store 的 actions 属性没有包含 key 为 type 的对象
          //  那么页面 dispatch 会抛出错误，因为访问了一个不存在的异步方法
          if (!store._actions[type]) {
            console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
            return
          }
        }
        return store.dispatch(type, payload)
      },
    commit: noNamespace ? store.commit : function (_type: any, _payload: any, _options: any) {
      var args = unifyObjectStyle(_type, _payload);
      var payload = args.payload;
      var type = args.type;
      if (!_options) {// 因为
        type = namespacename + type
        console.log("type:", type)
        console.log("store._mutations:", store._mutations)
        console.log("store._mutations[type]:", store._mutations[type])

        if (!store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }
      store.commit(type, payload)
    },
    state: {}
  }

  Object.defineProperties(local, {
    state: {
      get: function () {
        return getNestedState(store.state, path);
      }
    }
  })
  return local
}
// 12-13 增加1 结束


// 12-12  增加1结束

// 12-12  增加3 开始
function getNestedState<S>(state: S, path: string[]) {
  return path.reduce(function (state, key) {
    return (state as any)[key];
  }, state)
}
// 12-12  增加3 结束


// 12-11 增加1开始
function unifyObjectStyle(type: any, payload: any) {

  // 如果type类型不为字符串,直接抛出错误
  {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }
  // return { type: type, payload: payload, options: options }
  return { type, payload }
}
function assert(condition: boolean, msg: string) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}
// 12-11 增加1结束


function createStore<S>(options: StoreOptions<S>) {
  return new Store<S>(options)
}

// 12-7   【 手写  TS 版 Vuex4 源码 】单模块源码
// ModuleWrapper类对象和Module对象的区别
// Module对象是ModuleWrapper类对象中的一个模块保存属性.
export class ModuleWrapper<S>{

  _children: ModuleWrapper<S>// 保存下一个ModuleWrapper类对象
  _rawModule: Module<any, S>// 保存每一个Module模块到ModuleWrapper对象
  state: S
  namespaced: boolean
  context = Object.create(null)

  constructor(rawModule: Module<any, S>) {
    this._children = Object.create(null)
    this._rawModule = rawModule
    this.state = rawModule.state || Object.create(null)
    this.namespaced = rawModule.namespaced || false
  }
  addChild(key: string, module: ModuleWrapper<S>) {
    (this._children as any)[key] = module;
  }
  getChild(key: string) {
    return (this._children as any)[key]
  }
  // 12-9 增加1 开始
  forEachMutation(fn: MutationToKey<S>) {
    if (this._rawModule.mutations) {// 如果 mutations 存在
      Util.forEachValue(this._rawModule.mutations, fn)
    }
  }

  forEachAction(fn: ActionToKey<S>) {
    if (this._rawModule.actions) {
      Util.forEachValue(this._rawModule.actions, fn)
    }
  }
  forEachGetter(fn: GettersTokey<S>) {
    if (this._rawModule.getters) {
      Util.forEachValue(this._rawModule.getters, fn);
    }
  }
  forEachChild(fn: ChildModuleTokey<S>) {
    Util.forEachValue(this._children, fn)
  }
  // 12-9 增加1 结束
}

//  12-9 增加2开始
interface GettersTokey<S> {
  (module: Getter<any, S>, key: string): void,
}


interface ChildModuleTokey<S> {
  (module: ModuleWrapper<S>, key: string): void,
}

interface MutationToKey<S> {
  (mutation: Mutation<S>, key: string): void,
}

interface ActionToKey<S> {
  (action: Action<any, S>, key: string): void,
}
//  12-9 增加2结束

// 12-8 【 手写  TS 版 Vuex4 源码 】多模块源码
class ModuleCollection<S> {
  root!: ModuleWrapper<S>
  constructor(rawRootModule: Module<any, S>) {
    this.register([], rawRootModule)
    console.log("this.root:", this.root)
  }

  getNameSpace(path: string[]) {
    var module = this.root;
    return path.reduce(function (namespace, key) {
      module = module.getChild(key);
      return namespace + (module.namespaced ? key + '/' : '')
    }, '')
  }
  // rawModule首次为index.ts文件中的StoreOptions选项对象
  // 递归
  register(path: any[], rawModule: Module<any, S>) {
    var newModule = new ModuleWrapper(rawModule);

    if (path.length == 0) {// path长度等于0，表示首次调用register,增加根module
      // 如果 rawModule首次为index.ts文件中的StoreOptions选项对象
      // 创建根Module 保存到ModuleCollection的root属性中
      this.root = newModule
    } else {// 通过S99递归后会再次判断来创建module，添加到parent中
      var parent: ModuleWrapper<S> = this.get(path.slice(0, -1));
      parent.addChild(path[path.length - 1], newModule);
    }
    if (rawModule.modules) {// S100register nested modules
      Util.forEachValue(rawModule.modules,
        (rawChildModule: Module<any, S>, key: string) => {
          this.register(path.concat(key), rawChildModule)// S99 递归
        })
    }

  }
  get(path: Array<any>): ModuleWrapper<S> {
    return path.reduce(function (module: ModuleWrapper<S>, key: string) {
      return module.getChild(key)
    }, this.root);
  }
}

class Util {

  static forEachValue(obj: object, fn: any) {
    Object.keys(obj).forEach(function (key) {
      return fn((obj as any)[key], key)
    })
  }
}
```

**12-17  【 手写  TS 版 Vuex4 源码 】模块注册——ActionContext  对象实现  **

```js

import { App, inject } from 'vue'
const injectKey = "store"
export function useStore<S>(): Store<S> {
  return inject(injectKey) as any
}
export function createStore<S>(options: StoreOptions<S>) {
  return new Store<S>(options)
}

class Store<S = any>{
  moduleCollection: ModuleCollection<S>
  mutations: Record<string, any> = {}
  actions: Record<string, any> = {}
  getters: GetterTree<any, S> = {}
  commit: Commit;
  dispatch: Dispatch;
  constructor(options: StoreOptions<S>) {
    console.log("options:", options)
    this.moduleCollection = new ModuleCollection<S>(options)
    var store = this;
    var ref = this;
    var commit = ref.commit_
    var dispatch = ref.dispatch_

    this.commit = function boundCommit(type: string, payload: any) {
      commit.call(store, type, payload)
    }

    this.dispatch = function boundDispatch(type: string, payload: any) {
      dispatch.call(store, type, payload)
    }
    // 注册模块
    var rootState = this.moduleCollection.root.state
    console.log("开始注册模块 installModule:");
    installModule(store, rootState, [], this.moduleCollection.root)
    console.log("模块注册完后的rootState:", rootState)
  }
  install(app: App) {
    app.provide(injectKey, this)
  }
  test() {
    return "我是store";
  }
  commit_(type: string, payload: any) {
    if (!this.mutations[type]) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    console.log("commit:type:", type);
    this.mutations[type](payload)
  }
  dispatch_(type: string, payload: any) {
    if (!this.actions[type]) {
      console.error(("[vuex] unknown actions type: " + type));
    }
    this.actions[type](payload)
  }
}
/**
 * 
 * @param store 
 * @param rootState_  根state
 * @param path  保存模块名【命名空间名】的数组
 * @param module 当前模块
 */
function installModule<R>(store: Store<R>, rootState_: R, path: string[],
  module: ModuleWrapper<any, R>) {

  var isRoot = !path.length
  console.log("path:", path)
  
  let namespace = store.moduleCollection.getNamespace(path);
  console.log("installModule namespace 哈哈:", namespace)
  let actionContext: ActionContext<any, R> = makeLocalContext(store, namespace)
  //let namespace = module.getNamespace(path)
  if (!isRoot) { //  1.如果不是根模块
    // 1.拿到父级的 state对象
    var parentState: Record<string, any> = getParentState(rootState_, path.slice(0, -1))
    // 2.把当前模块的 state对象 和当前模块名合成一个对象，加到父级state对象上
    parentState[path[path.length - 1]] = module.state

  }
  module.forEachChild(function (child, key) {
    installModule(store, rootState_, path.concat(key), child)
  })
  module.forEachGetter(function (getter, key) {
    let namespaceType = namespace + key
    //store.getters[namespaceType] = getter
    Object.defineProperty(store.getters, namespaceType, {
      get: () => {
        return getter(module.state)
      }
    })
  })
  module.forEachMutation(function (mutation, key) {
    let namespaceType = namespace + key
    store.mutations[namespaceType] = function (payload: any) {
      mutation.call(store, module.state, payload)
    }
  })

  module.forEachAction(function (action, key) {
    let namespaceType = namespace + key
    store.actions[namespaceType] = function (payload: any) {
      //action({ commit: store.commit }, payload)
      action.call(store, { commit: actionContext.commit }, payload)
    }
  })
}

function makeLocalContext<R>(store: Store<R>, namespace: string) {
  let noNamespace = namespace === ""//根模块没有命名空间
  let actionContext: ActionContext<any, R> = {
    commit: noNamespace ? store.commit : function (type, payload) {
      type = namespace + type
      store.commit(type, payload);
    }
  }
  return actionContext
}

function getParentState<R>(rootState: R, path: string[]) {
  return path.reduce((state, key) => {
    return (state as any)[key]
  }, rootState)
}
// path: ["foodSortModule", "foodModule", "foodDetailModule"]

// rootState:
// {
//   "navList": 根state对象数据
//   "foodSortModule": {
//     foodSortList: { 美食分类对象数据 },
//     "foodModule": {
//       "美食state对象数据",
//         "foodDetailModule": { 美食详情对象数据 }
//     }
//   }

//   "hotelSortModule": 酒店分类state数据对象 //酒店分类 state

// }// rootState对象结束


//console.error(("[vuex] unknown mutation type: " + type));

class ModuleCollection<R>{
  root!: ModuleWrapper<any, R>
  constructor(rawRootModule: Module<any, R>) {
    this.register([], rawRootModule)
  }
  register(path: string[], rawModule: Module<any, R>) {
    let newModule = new ModuleWrapper<any, R>(rawModule)
    if (path.length === 0) {// path长度等于0 为根模块
      this.root = newModule
    } else {// 添加子模块到父级模块中
      console.log("开始添加子模块到父级模块中");

      console.log("1.先获取父级ModuleWrapper对象:", parent);
      let parentModule = this.get(path.slice(0, -1))
      console.log("2.添加子模块【添加格式：(path——子模块命名空间)-子模块】:");
      parentModule.addChild(path[path.length - 1], newModule)
      console.log("=====================");
    }
    if (rawModule.modules) {
      let sonModules = rawModule.modules

      // Object.keys(sonModules).forEach(key => {
      //   this.register(path.concat(key), sonModules[key])
      // })
      Util.forEachValue(sonModules, (modules: Module<any, R>, key: string) => {
        this.register(path.concat(key), modules)
      })
    }
  }

  get(path: string[]) {
    let module = this.root;
    return path.reduce((moduleWrapper: ModuleWrapper<any, R>, key: string) => {
      return module.getChild(key)
    }, module)
  }

  getNamespace(path: string[]) {
    let moduleWrapper = this.root
    return path.reduce(function (namespace, key) {
      moduleWrapper = moduleWrapper.getChild(key)
      return namespace + (moduleWrapper.namespaced ? key + "/" : '')
    }, '')
  }
}

class Util {
  static forEachValue(obj: object, fn: Function) {
    Object.keys(obj).forEach(key => {
      fn((obj as any)[key], key)
    })
  }

}

class ModuleWrapper<S, R>{
  children: Record<string, ModuleWrapper<any, R>> = {}
  rawModule: Module<any, R>
  state: S
  namespaced: boolean
  constructor(rawModule_: Module<any, R>) {
    this.rawModule = rawModule_
    this.state = rawModule_.state || Object.create(null)
    this.namespaced = rawModule_.namespaced || false
  }
  addChild(key: string, moduleWrapper: ModuleWrapper<any, R>) {
    this.children[key] = moduleWrapper
  }
  getChild(key: string) {
    return this.children[key]
  }
  forEachChild(fn: ChldMdleWrperToKey<R>) {
    Util.forEachValue(this.children, fn);
  }

  forEachGetter(fn: GetterToKey<R>) {
    if (this.rawModule.getters) {
      Util.forEachValue(this.rawModule.getters, fn)
    }
  }
  forEachMutation(fn: MutationToKey<S>) {
    if (this.rawModule.mutations) {
      Util.forEachValue(this.rawModule.mutations, fn)
    }
  }
  forEachAction(fn: ActionToKey<S, R>) {
    if (this.rawModule.actions) {
      Util.forEachValue(this.rawModule.actions, fn)
    }
  }
}
type ActionToKey<S, R> = (action: Action<S, R>, key: string) => any
type MutationToKey<S> = (getter: Mutation<S>, key: string) => any
type GetterToKey<R> = (getter: Getter<any, R>, key: string) => any
type ChldMdleWrperToKey<R> = (moduleWrapper: ModuleWrapper<any, R>, key: string) => void


// 1. StoreOptions 接口增加多模块管理属性 start
interface StoreOptions<S> {
  state?: S;
  getters?: GetterTree<S, S>;
  mutations?: MutationTree<S>;
  actions?: ActionTree<S, S>
  modules?: ModuleTree<S>
}

interface ModuleTree<R> {
  [key: string]: Module<any, R>
}
export interface Module<S, R> {
  namespaced?: boolean;
  state?: S;
  getters?: GetterTree<S, R>;
  mutations?: MutationTree<S>;
  actions?: ActionTree<S, R>;
  modules?: ModuleTree<R>
}
// 1.StoreOptions 接口增加多模块管理属性  end 
// ActionContext
interface ActionContext<S, R> {
  //dispatch: Dispatch;
  commit: Commit;
  //state: S;
}
type Dispatch = (type: string, payload?: any) => any
type Commit = (type: string, payload?: any) => any
// ActionTree
interface ActionTree<S, R> {
  [key: string]: Action<S, R>
}
type Action<S, R> = (context: ActionContext<S, R>, payload?: any) => any
// MutationTree
interface MutationTree<S> {
  [key: string]: Mutation<S>
}
type Mutation<S> = (state: S, payload?: any) => void
// GetterTree
interface GetterTree<S, R> {
  [key: string]: Getter<S, R>
}


//type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any
type Getter<S, R> = (state: S) => any
```

**慕课网 TS 高级课程**

**12-18  【 手写  TS 版 Vuex4 源码 】作业：模块注册——解决模块重复问题**

**12-19  【 手写  TS 版 Vuex4 源码 】模块注册—— 挑战性有难度的作业—— 响应式实现** 

##### 

