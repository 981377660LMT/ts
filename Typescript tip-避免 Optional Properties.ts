// https://juejin.cn/post/7099624662770024478

import React from 'react'

// 给定一个默认值为空对象，在之后渲染的时候或者从接口里拿数据
// 这种情况下大多数同学可能会定义 类型是这样的
type ContextType = {
  handle?: () => void
  state?: string
}

// 但是这样的写法就无法发挥 typescript 强大的类型推断能力，在使用的时候必须针对于每个值判空
;() => {
  const context = React.createContext<ContextType>({})
  const { handle, state } = React.useContext(context)
  if (state) {
    handle?.()
  }
}

// !这里其实 state 已经为存在了，那么 handle 必然也是存在的，所以这样的类型定义是存在瑕疵的

// 这里其实我们的类型只有 两种情况
// {}
// 和
// type ContextType = {
//     handle: () => void;
//     state: string;
// }

// !解决办法是定义一个具体 相同的可选结构, 值类型为 undefined 的类型，再与其联合
type TrueContextType = {
  handle: () => void
  state: string
}

type UndefinedRecord<T extends Record<string, any>> = Partial<{
  [K in keyof T]: undefined
}>

type AllContextType = UndefinedRecord<TrueContextType> | TrueContextType
const typeC = React.createContext<AllContextType>({})

const { handle, state } = React.useContext(typeC)
if (state) {
  handle()
}

export {}
