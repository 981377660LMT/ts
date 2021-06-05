import * as React from 'react'
declare namespace JSX {
  interface ElementClass {
    render: any
  }
}

class MyComponent {
  render() {}
}
function MyFactoryFunction() {
  return { render: () => {} }
}

const a_ = <MyComponent /> // 正确
