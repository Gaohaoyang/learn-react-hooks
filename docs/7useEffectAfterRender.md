# useEffect After Render

通过一个点击按钮，修改页面 title 的例子来说明

## Class 组件的写法示例

7ClassCounter.tsx

``` tsx
import React, { Component } from 'react'

class ClassCounter extends Component {

  state = {
    count: 0
  }

  componentDidMount() {
    document.title = `${this.state.count} times`
  }
  componentDidUpdate() {
    document.title = `${this.state.count} times`
  }

  render() {
    return (
      <div>
        <button onClick={() => {
          this.setState({
            count: this.state.count + 1
          })
        }}>
          Clicked {this.state.count} times
        </button>

      </div>
    )
  }
}

export default ClassCounter
```

App.tsx

``` tsx
import React from 'react'

import './App.css'

import ClassCounter from './components/7ClassCounter'

const App = () => {
  return (
    <div className="App">
      <ClassCounter />
    </div>
  )
}

export default App

```

效果如下

![](https://gw.alicdn.com/tfs/TB1yhhavy_1gK0jSZFqXXcpaXXa-418-215.gif)

## 函数式组件的示例

接下来使用函数时组件实现上述的例子

7HookCounter.tsx

``` tsx
import React, { useState, useEffect } from 'react'

function HookCounter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `${count} times`
  })

  return (
    <div>
      <button onClick={() => {
        setCount(prevCount => prevCount + 1)
      }} >Clicked {count} times</button>
    </div>
  )
}

export default HookCounter
```

效果和 Class 组件相同

![](https://gw.alicdn.com/tfs/TB1yhhavy_1gK0jSZFqXXcpaXXa-418-215.gif)

## 小结

useEffect 的第一个入参是一个匿名函数，它会在每次render 后调用。在第一次 render 和后续的更新 render 都会被调用。

另外，useEffect 写在函数式组件内，这样就可以直接拿到 props 和 state 的值，不用写 this 之类的代码。
