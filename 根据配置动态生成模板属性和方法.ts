// 根据配置动态生成模板属性和方法(例如store)

import _ from 'lodash'
import { CamelCase } from 'type-fest'

// type SnakeToCamel<S extends string> = S extends `${infer Left}_${infer Right}${infer Rest}`
//   ? `${Left}${Uppercase<Right>}${SnakeToCamel<Rest>}`
//   : S

type Store<Keys extends readonly string[]> = {
  [K in Keys[number] as `${CamelCase<Lowercase<K>>}Visible`]: boolean
} & {
  [K in Keys[number] as `set${Capitalize<CamelCase<Lowercase<K>>>}`]: () => void
}

const createStore = <Keys extends readonly string[]>(keys: Keys): Store<Keys> => {
  const store = {} as any
  keys.forEach(key => {
    const camelCaseKey = _.camelCase(key)
    const camelCaseKeyVisible = `${camelCaseKey}Visible`
    const setCamelCaseKey = `set${_.upperFirst(camelCaseKey)}`
    store[camelCaseKeyVisible] = false
    store[setCamelCaseKey] = () => {
      store[camelCaseKeyVisible] = !store[camelCaseKeyVisible]
    }
  })
  return store
}

const keys = ['USER_AVATAR', 'USER_NAME', 'full_family_name'] as const

type Mapping<T> = {
  [K in keyof T]: T[K]
}

type Foo = Mapping<typeof store>
const store = createStore(keys)
console.log(store.fullFamilyNameVisible, store.userAvatarVisible, store.userNameVisible)
store.setFullFamilyName()
console.log(store.fullFamilyNameVisible)
store.setFullFamilyName()
console.log(store.fullFamilyNameVisible)
store.setUserName()
store.fullFamilyNameVisible
