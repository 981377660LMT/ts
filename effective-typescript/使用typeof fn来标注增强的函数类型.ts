const myFetch: typeof fetch = (...args) => {
  return fetch(...args).then(res => {
    if (!res.ok) throw new Error('failed')
  })
}

// 可以继续获取类型检查
myFetch('/api')

// `增强`的意思即为wrapper

export {}
