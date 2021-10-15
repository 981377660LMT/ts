// https://zhuanlan.zhihu.com/p/365964861
// 1.如何引入 React
import * as React from 'react'
import * as ReactDOM from 'react-dom'
// 而另外一种引用方式:
// import React from 'react'
// import ReactDOM from 'react-dom'
// 需要添加额外的配置："allowSyntheticDefaultImports": true

// 2.函数式组件的声明方式
// 比较推荐的一种，使用 React.FunctionComponent，简写形式：React.FC:
interface IAppProps {}
const App: React.FC<IAppProps> = props => {
  return <div></div>
}
export default App
// React.FunctionComponent 返回类型为ReactElement<any, any> | null;
interface ReactElement<
  P = any,
  T extends string | React.JSXElementConstructor<any> = string | React.JSXElementConstructor<any>
> {
  type: T
  props: P
  key: Key | null
}

// 3.自定义hook
// 需要注意，自定义 Hook 的返回值如果是数组类型，TS 会自动推导为 Union 类型，而我们实际需要的是数组里里每一项的具体类型，需要手动添加 const 断言 进行处理：
function useLoading() {
  const [isLoading, setState] = React.useState(false)
  const load = (aPromise: Promise<any>) => {
    setState(true)
    return aPromise.then(() => setState(false))
  }
  // 实际需要: [boolean, typeof load] 类型
  // 而不是自动推导的：(boolean | typeof load)[]
  return [isLoading, load] as const
}

// 4.默认属性 defaultProps
// 大部分文章都不推荐使用 defaultProps , 相关讨论可以**参考链接**
// 推荐方式：使用默认参数值来代替默认属性：
type GreetProps = { age?: number }
const Greet = ({ age = 21 }: GreetProps) => {
  /* ... */
}

// 5.使用 Type 还是 Interface？
// 在定义公共 API 时(比如编辑一个库）使用 interface，这样可以方便使用者继承接口
// 在定义组件属性（Props）和状态（State）时，建议使用 type，因为 type的约束性更强

// 6.获取未导出的 Type
// 获取参数类型
// import { Button } from 'library' // 但是未导出props type
// type ButtonProps = React.ComponentProps<typeof Button> // 获取props
// type AlertButtonProps = Omit<ButtonProps, 'onClick'> // 去除onClick
// const AlertButton: React.FC<AlertButtonProps> = props => (
//   <Button onClick={() => alert('hello')} {...props} />
// )

// 7.增加相对详细的注释，使用时会更清晰，需要注意，注释需要使用 /**/ ， // 无法被 vscode 识别
// Great

/**
 * @param color color
 * @param children children
 * @param onClick onClick
 */
type Props = {
  /** color */
  color?: string

  /** children */
  children: React.ReactNode

  /** onClick */
  onClick: () => void
}

// type Props
// @param color — color
// @param children — children
// @param onClick — onClick
const Button: React.FC<Props> = ({ children, color = 'tomato', onClick }) => {
  return (
    <button style={{ backgroundColor: color }} onClick={onClick}>
      {children}
    </button>
  )
}

// 8. useRef<T>
// const ref1 = React.useRef<HTMLElement>(null)
// const ref2 = React.useRef<HTMLElement | null>(null)

// 9. useMemo<T> / useCallback<T>
const val = 10
const result = React.useMemo(() => val * 2, [val])
const multply = React.useCallback((value: number) => val * value, [val])

// 10.常用 React 属性类型
export declare interface AppBetterProps {
  children: React.ReactNode // 一般情况下推荐使用，支持所有类型 Great
  functionChildren: (name: string) => React.ReactNode // recommended function as a child render prop type
  style?: React.CSSProperties // 传递style对象
  onChange?: React.FormEventHandler<HTMLInputElement> // 表单事件, 泛型参数是event.target的类型
}

// 11. Forms and Events
// onChange
// onSubmit  React.SyntheticEvent(合成事件)

// 12.事件处理
// ClipboardEvent<T = Element> 剪切板事件对象
// DragEvent<T =Element> 拖拽事件对象
// ChangeEvent<T = Element> Change 事件对象
// KeyboardEvent<T = Element> 键盘事件对象
// MouseEvent<T = Element> 鼠标事件对象
// TouchEvent<T = Element> 触摸事件对象
// WheelEvent<T = Element> 滚轮时间对象
// AnimationEvent<T = Element> 动画事件对象
// TransitionEvent<T = Element> 过渡事件对象

// 13.事件处理函数类型:使用 React 声明文件所提供的 EventHandler 类型别名
// React合成事件的事件是React.SyntheticEvent<any> 包括React.FormEvent<T> React.ChangeEvent<T> 等
// 事件处理函数是EventHandler
type EventHandler<E extends React.SyntheticEvent<any>> = {
  bivarianceHack(event: E): void
}['bivarianceHack']
type ReactEventHandler<T = Element> = EventHandler<React.SyntheticEvent<T>>

// 14.泛型参数的组件
// 如果想不指定，而是想通过传入参数的类型去推导实际类型，这就要用到泛型。
interface IDemoProps<T> {
  name: T
  name2?: T
}

function Demo<T>(props: IDemoProps<T>) {
  return <div>{props.name}</div>
}

const TestD = () => {
  return (
    <div>
      <Demo<string> name="123" name2="" />
    </div>
  )
}
