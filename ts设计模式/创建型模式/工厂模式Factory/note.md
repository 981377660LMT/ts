假设你正在开发一款物流管理应用。 最初版本只能处理卡车运输， 因此大部分代码都在位于名为 卡车的类中。

一段时间后， 这款应用变得极受欢迎。 你每天都能收到十几次来自海运公司的请求， 希望应用能够支持海上物流功能。
这可是个好消息。 但是代码问题该如何处理呢？ 目前， 大部分代码都与 卡车类相关。 在程序中添加 轮船类需要修改全部代码。 更糟糕的是， 如果你以后需要在程序中支持另外一种运输方式， 很可能需要再次对这些代码进行大幅修改。

最后， 你将不得不编写繁复的代码， 根据不同的运输对象类， 在应用中进行不同的处理。

解决方案
工厂方法模式建议使用特殊的工厂方法代替对于对象构造函数的直接调用 （即使用 new 运算符）。 不用担心， 对象仍将通过 new 运算符创建， 只是该运算符改在工厂方法中调用罢了。 工厂方法返回的对象通常被称作 “产品”。
![](note/2021-06-06-20-23-01.png)

工厂模式不一定要...Factory.create
工厂的 create 可以 static 可以实例方法
思想是 在内部 new 一个对象

**从 NestFactory.create 开始**
nest-factory 通过 container

```JS
const instance = new NestApplication(
      container,
      httpServer,
      applicationConfig,
      appOptions,
    );

// 里面createProxy：产生一个Proxy 将所有对函数属性的set get 包裹在 createExceptionsZone 中运行
const target = this.createNestInstance(instance);

return this.createAdapterProxy<T>(target, httpServer);
```

依赖注入的实现总结
回顾一下 Nest.js 的依赖注入实现思路，主要分为三个大步骤（两个阶段扫描+实例化）：
注册 => 挂载 => 实例化

```JS
// 根模块 容器 容器设置 服务器   (IOC容器构建)
private async initialize(
      module: any,
      container: NestContainer,
      config = new ApplicationConfig(),
      httpServer: HttpServer = null,
      ) {
        // 生成`实例加载器`和`依赖扫描器`。
        const instanceLoader = new InstanceLoader(container);
        const metadataScanner = new MetadataScanner();
        const dependenciesScanner = new DependenciesScanner(
          container,
          metadataScanner,
          config,
          );
          // 接着容器与httpServer绑定。
          container.setHttpAdapter(httpServer);

          const teardown = this.abortOnError === false ? rethrow : undefined;
          await httpServer?.init();
          const container = new NestContainer();
    try {
      this.logger.log(MESSAGES.APPLICATION_START);

      // 接着使用内部异常处理器（为了统一异常处理）异步去运行最后的步骤。
      await ExceptionsZone.asyncRun(
        async () => {
          await dependenciesScanner.scan(module);
          await instanceLoader.createInstancesOfDependencies();
          dependenciesScanner.applyApplicationProviders();
        },
        teardown,
        this.autoFlushLogs,
      );
    } catch (e) {
      this.handleInitializationError(e);
    }
  }
```

1. 【Scan 阶段】启动程序，通过 APPModule，在 Scanner 模块逐步寻找相关 Module，构造 Module 依赖树
   它主要注册在 Container 中：
2. 【Scan 阶段】在构造 Module 的同时，为 providers、controllers、middwares、injectables 等创建 instanceWrapper 实例

```JS
private readonly modules = new ModulesContainer();
而ModuleContainer实际上是Module的一个Map：
export class ModulesContainer extends Map<string, Module> {}
Module本身的数据结构中，则存储了在Module范围内的所有子组件集合：
private readonly _imports = new Set<Module>();
private readonly _providers = new Map<any, InstanceWrapper<Injectable>>();
private readonly _injectables = new Map<any, InstanceWrapper<Injectable>>();
private readonly _middlewares = new Map<any, InstanceWrapper<Injectable>>();
private readonly _controllers = new Map<any, InstanceWrapper<Injectable>>();
每一个Map集合中都存储了instanceWrapper，在该Wrapper上去挂载最后的实例。
```

2. 【instance 阶段】实例化过程，分析 contributor 构造传参，根据依赖关系从叶子节点开始逐步递归进行实例化，存储在 instanceWrapper 的 values 集合中（非 DEFAULT 的 Scope 是有多个实例的）
   instance 阶段的核心是——怎样拿到类的构造函数参数？

```JS
Reflect.getMetadata('design:paramtypes', Provider)
```
