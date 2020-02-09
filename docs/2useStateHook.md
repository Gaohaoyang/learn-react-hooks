# Use State Hook

## Counter 计数器示例

### Class 组件的写法

CounterClass.tsx

``` tsx
import React, { Component } from 'react'

class CounterClass extends Component {

  state = {
    count: 0
  }

  incrementCount = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    const { count } = this.state
    return (
      <div>
        <button onClick={this.incrementCount}>Count {count}</button>
      </div>
    )
  }
}

export default CounterClass

```

App.tsx

``` tsx
import React from 'react'

import './App.css'

import CounterClass from './components/CounterClass'

const App = () => {
  return (
    <div className="App">
      <CounterClass />
    </div>
  )
}

export default App
```

效果如下

![](https://gw.alicdn.com/tfs/TB1oZQLveL2gK0jSZPhXXahvXXa-306-179.gif)

创建这样的一个计数器分为简单的3步

1. 创建一个 Class 组件
2. 创建 state
3. 创建 increment 方法

接下来看看如何使用 Function Component 和 state hook 实现

### State Hook 实现

HookCounter.tsx

``` tsx
import React, { useState } from 'react'

function HookCounter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <button onClick={() => {
        setCount(count + 1)
      }}>Count {count}</button>
    </div>
  )
}

export default HookCounter
```

App.tsx

``` tsx
import React from 'react'

import './App.css'

// import CounterClass from './components/1CounterClass'
import HookCounter from './components/1HookCounter'

const App = () => {
  return (
    <div className="App">
      <HookCounter />
    </div>
  )
}

export default App

```

效果与 Class 组件写法相同

![](https://gw.alicdn.com/tfs/TB1oZQLveL2gK0jSZPhXXahvXXa-306-179.gif)


## Hooks 的使用规则

- 只能在顶层作用域调用 Hooks
  - 不能在内部的循环、条件判断、嵌套的方法中使用
- 只能在 React Function 里使用 Hooks
  - 不能在其他普通的 function 中使用 Hooks
