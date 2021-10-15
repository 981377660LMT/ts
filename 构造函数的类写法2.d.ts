declare namespace CMNX {
  class Component<P> {
    constructor(props: any)
    static contextType?: Record<string, any> | undefined
    context: any
    init(): void
    readonly props: Readonly<P>
  }
}

export = CMNX // (导出为CMNX命名空间)

// alias 写法 没有namespace 也可以这样写
export as namespace HaHaHaCMNX

// 导出函数
// export function findDOMNode(instance: ReactInstance | null | undefined): Element | null | Text;

// 导出值
// export const version: string;
// export const render: Renderer;

declare global {
  namespace caomeinaixi {}
}

// namespace里也可以用接口管理一些属性与方法

// 默认为declare module
