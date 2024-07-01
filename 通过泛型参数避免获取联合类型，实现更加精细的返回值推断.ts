// https://github.com/981377660LMT/ts/issues/479
// 通过泛型参数避免获取联合类型，实现更加精细的返回值推断

// eg:

interface IUserConfig {
  name: string
  age: number
  gender: 'male' | 'female'
}

type UserConfigKeys = keyof IUserConfig

// bad1
// interface IConfigEntry {
//   key: UserConfigKeys
//   value: IUserConfig[UserConfigKeys]
// }

// good1
type ConfigEntry<K extends UserConfigKeys> = {
  key: K
  value: IUserConfig[K]
}
type ConfigEntryRecord = { [K in UserConfigKeys]: ConfigEntry<K> }

interface IUserStore {
  // bad2
  // getUserConfig(key: UserConfigKeys): IUserConfig[UserConfigKeys]
  // good2
  getUserConfig<K extends UserConfigKeys>(key: K): IUserConfig[K]

  getAllUserConfig(): Array<ConfigEntryRecord[UserConfigKeys]>
}

class UserStore implements IUserStore {
  getUserConfig<K extends keyof IUserConfig>(key: K): IUserConfig[K] {
    return null as any
  }
  getAllUserConfig(): Array<ConfigEntryRecord[UserConfigKeys]> {
    return []
  }
}

if (require.main === module) {
  const userStore = new UserStore()
  const age = userStore.getUserConfig('age') // number
  const allConfig = userStore.getAllUserConfig()
  allConfig.forEach(v => {
    if (v.key === 'age') {
      console.log(v.value) // number
    } else if (v.key === 'name') {
      console.log(v.value) // string
    }
  })
}

export {}
