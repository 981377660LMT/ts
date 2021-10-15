// void 和 undefined 类型最大的区别是，你可以理解为 undefined 是 void 的一个子集，
// 当你对函数返回值并不在意时，使用 void 而不是 undefined。举一个 React 中的实际的例子。

import React from 'react'

// Parent.tsx
function Parent(): JSX.Element {
  const getValue = (): number => {
    return 2
  } /* 这里函数返回的是number类型 */
  // const getValue = (): string => { return 'str' }; /* 这里函数返回的string类型，同样可以传给子属性 */
  return <Child getValue={getValue} />
}

// Child.tsx
type Props = {
  getValue: () => void // 这里的void表示逻辑上不关注具体的返回值类型，number、string、undefined等都可以
}

function Child({ getValue }: Props) {
  return <div>{getValue()}</div>
}

export {}
