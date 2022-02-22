Node.js 当 require 一个 js 模块的时候，内部会分别调用 Module.load、 `Module._extensions['.js']`，Module.\_compile 这三个方法，然后才是执行。

我们可以 hack 进`Module._extensions['.js']`方法添加很多逻辑
ts 模块、json 模块等也是一样的流程，那么我们只需要修改 `Module._extensions[扩展名]` 的方法，就能达到 hook 的目的：

```JS
require.extensions['.ts'] = function(module, filename) {
    // 修改代码
    module._compile(修改后的代码, filename);
}
```

比如上面我们注册了 ts 的处理函数，这样当处理 ts 模块时就会调用这个方法，所以我们在这里面做编译就可以了，`这就是 ts-node 能够直接执行 ts 的原理。`

此外，统计代码覆盖率的`istanbul库也是基于此原理实现`
