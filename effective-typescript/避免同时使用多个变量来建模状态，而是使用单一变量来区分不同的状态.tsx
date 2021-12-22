import React from 'react'
import { useState } from 'react'

const App = () => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  async function load() {
    setLoading(true)
    try {
      const resp = await fetch(getUrlForPage())
      if (!resp.ok) {
        throw new Error('unable to load')
      }
      const text = await resp.text()
      setLoading(false)
      setContent(text)
    } catch (e: any) {
      setError(e)
    }
  }

  if (error) {
    return 'Error'
  } else if (loading) {
    return 'loading'
  }
  return <h1>{content}</h1>
}

function getUrlForPage(): RequestInfo {
  throw new Error('Function not implemented.')
}
// 上面的代码明显存在一些问题

// 请求失败时忘记重置loading状态
// 忘记情况error状态
// 重新拉接口时，状态容易错乱

// 由于Error, Loading,Content等状态实际上是互斥的，因此可以用一个变量通过tagged union来建模状态 重构代码如下
interface RequestPending {
  type: 'pending'
}
interface RequestError {
  type: 'error'
  error: string
}
interface RequestSuccess {
  type: 'ok'
  content: string
}
type RequestState = RequestError | RequestPending | RequestSuccess

const App2 = () => {
  const [state, setState] = useState<RequestState>({
    type: 'ok',
    content: '',
  })

  async function load() {
    setState({
      type: 'pending',
    })
    try {
      const resp = await fetch(getUrlForPage())
      if (!resp.ok) {
        throw new Error('unable to load')
      }
      const text = await resp.text()
      setState({
        type: 'ok',
        content: text,
      })
    } catch (error: any) {
      setState({
        error,
        type: 'error',
      })
    }
  }

  switch (state.type) {
    case 'pending':
      return 'pending'
    case 'error':
      return state.error
    case 'ok':
      return <h1>{state.content}</h1>
  }
}
// 此时就完全避免了上面存在的几个问题，而且后续每次增加新的状态 Typescript都可以帮我们进行类型检查
