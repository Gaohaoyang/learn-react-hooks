# useEffect With Incorrect Dependency

useEffect 的依赖(第二个参数)错误导致的问题。

以每秒 +1 的计数器为示例

## Class 组件示例

11Counter.tsx

``` tsx
/**
 * 每秒 +1 的计数器
 */

import React, { Component } from 'react'

class Counter extends Component {

  state = {
    count: 0
  }

  timer: number | undefined

  tick = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  componentDidMount() {
    this.timer = window.setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }


  render() {
    return (
      <div>
        <span>{this.state.count}</span>
      </div>
    )
  }
}

export default Counter

```

App.tsx

``` tsx
import React from 'react'

import './App.css'

import IntervalCounter from './components/11Counter'

const App = () => {
  return (
    <div className="App">
      <IntervalCounter />
    </div>
  )
}

export default App

```

效果如下

![](https://gw.alicdn.com/tfs/TB1CiNxx9f2gK0jSZFPXXXsopXa-487-270.gif)

## hooks 示例

IntervalCounterHooks.tsx

``` tsx
import React, { useState, useEffect } from 'react'

function IntervalCouterHooks() {

  const [count, setCount] = useState(0)

  const tick = () => {
    setCount(count + 1)
  }

  useEffect(() => {
    const interval = setInterval(tick, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div>
      {count}
    </div>
  )
}

export default IntervalCouterHooks

```

App.tsx

``` tsx
import React from 'react'

import './App.css'

import IntervalCounter from './components/11Counter'
import IntervalCounterHooks from './components/11IntervalCouterHooks'

const App = () => {
  return (
    <div className="App">
      <IntervalCounter />
      <IntervalCounterHooks />
    </div>
  )
}

export default App

```

但是计数器没有正常工作，效果如下

![](https://gw.alicdn.com/tfs/TB13TdBx7T2gK0jSZPcXXcKkpXa-425-270.gif)

现在我们来解决这个问题，主要是依赖数组的问题。这个原因是空数组告诉了 react 组件，没有任何依赖，不用监听任何值去rerender，而 render 代码中的 count 就恰好没有被监听到，因此 useEffect 不会再次被触发。

这里我们不能将 useEffect 的第二个参数设置为空数组，而是 `[count]`。

当然还有另一种解决方案，如下

``` js
setCount(count + 1)
```

改为

``` js
setCount((preCount) =>  preCount + 1)
```

useEffect 的依赖数组里依然使用空数组。这里设置了 count 的值是和上一个值有关，也解决了问题。

![](https://gw.alicdn.com/tfs/TB1eq1qAeT2gK0jSZFvXXXnFXXa-433-292.gif)

## 多个 useEffect

如果代码中有多个业务逻辑，可以将他们写在不同的 useEffect 中，并且可以写多个 useState 和他们匹配分组使用，会让业务逻辑更加清晰。
