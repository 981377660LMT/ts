// 类型补充声明
// 这里声明的是全局的成员
// 类型声明就是骗ts的

// String 构造函数
// string 类型

interface Dict<T> {
  [key: string]: T
}

declare module 'lodash' {
  // 导出单个成员
  export const camelCase: (input: string) => string

  // 默认导出成员
  export default {
    camelCase,
  }

  // 相当于默认导出(历史原因)
  // export = { camelCase }

  // interface Lodash {
  //   camelCase: (input: string) => string
  // }

  // 不能导出类型，应该导出值
  // export default Lodash
}

declare module '*.png' {
  const url: string
  export default url
}

declare module '*.css' {
  const styles: Record<string, unknown>
  export default styles
}

// typescript约定找模块声明
// 先找package.json里的types字段的文件
// 找不到就找node_modules里的@types下的声明文件
// `lodash` → `@types/lodash`
// `@koa/cors` → `@types/koa__cors`

// interface的声明可以合并
declare module 'vue/types/vue' {
  interface Vue {
    $axios: string
  }
}

// 添加js.config声明模块
