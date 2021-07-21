// type FC<P = {}> = FunctionComponent<P>

// interface FunctionComponent<P = {}> {
//   (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null
//   propTypes?: WeakValidationMap<P>
//   contextTypes?: ValidationMap<any>
//   defaultProps?: Partial<P>
//   displayName?: string
// }

// // FunctionComponent 实际上是就是一个接口泛型，它定义了五个属性，
// // 其中四个是可选的，并且是静态类属性。
// // PropsWithChildren 实际上就是往 props 中插入 children
// type PropsWithChildren<P> = P & { children?: ReactNode }
export {}
