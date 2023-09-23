// 使用柯里化进行推断
type ThingProps<T, R> = {
  something: T
  callback: (arg: T) => R
  children: (result: R) => void
}

const fn = <T, R>(props: ThingProps<T, R>) => props

const result = fn({
  something: 1,
  callback: arg => arg.toString(),
  children: result => {}
})

type ThingProps2<T, R> = {
  something: T
  callback: (arg: T) => R
}

const fn2 =
  <T, R>(props: ThingProps2<T, R>) =>
  (children: (result: R) => void) => ({ ...props, children })

const withChildren = fn2({
  something: 1,
  callback: arg => arg.toString()
})

const result2 = withChildren((result /** string */) => {})
