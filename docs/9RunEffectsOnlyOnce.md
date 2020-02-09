# Run Effects Only Once

本节研究一下如何只执行一次 useEffect

## 记录鼠标位置示例

``` tsx
import React, { Component } from 'react'

class RunEffectsOnlyOnce extends Component {
  state = {
    x: 0,
    y: 0
  }

  logMousePos = (e: MouseEvent) => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.logMousePos)
  }

  render() {
    return (
      <div>
        Y - {this.state.y}, X - {this.state.x}
      </div>
    )
  }
}

export default RunEffectsOnlyOnce
```

![](https://gw.alicdn.com/tfs/TB1ydpavET1gK0jSZFrXXcNCXXa-295-225.gif)

这里只在 componentDidMount 中做了事件绑定，只执行了一次事件绑定

## useEffect 的示例

上述效果改造为函数式组件

``` tsx
import React, { useState, useEffect } from 'react'

function RunEffectsOnlyOnce() {

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const logMousePos = (e: MouseEvent) => {
    setX(e.clientX)
    setY(e.clientY)
  }

  useEffect(() => {
    console.log('addEventListener')
    document.addEventListener('mousemove', logMousePos)
  }, [])

  return (
    <div>
      Y - {y}, X - {x}
    </div>
  )
}

export default RunEffectsOnlyOnce
```

useEffect 方法的第二个参数传入一个空数组，有效的避免了多次调用的问题。
