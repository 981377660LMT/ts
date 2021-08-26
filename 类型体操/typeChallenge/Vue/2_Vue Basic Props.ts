type InferComputed<C extends Record<string, any>> = { [K in keyof C]: ReturnType<C[K]> }

type Prop<T = any> = PropType<T> | { type?: PropType<T> }
type PropType<T> = PropConstructor<T> | PropConstructor<T>[]

type PropConstructor<T = any> = { new (...args: any[]): T & object } | { (): T }

type InferPropType<P> = P extends Prop<infer T> ? (unknown extends T ? any : T) : any

type InferProps<P extends Record<string, any>> = { [K in keyof P]: InferPropType<P[K]> }

declare function VueBasicProps<
  P,
  D,
  C extends Record<string, any>,
  M,
  Props = InferProps<P>
>(options: {
  props?: P
  data(this: Props): D
  computed: C & ThisType<Props & D & InferComputed<C> & M>
  methods: M & ThisType<Props & D & InferComputed<C> & M>
}): Props & D & InferComputed<C> & M
