// 重写i18n返回的TFunction类型
// @ts-ignore
declare module '@my-i18n-web' {
  interface TFunction {
    (key: string, options?: any): string
  }

  interface getCacheLocale {
    (): string
  }

  export const i18nClient: {
    t: TFunction
    getText: TFunction
    [key: string]: any
  }
}

// !如何忽略react的children报错问题
