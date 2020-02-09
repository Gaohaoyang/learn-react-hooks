# Conditionally Run Effects

上一节了解到 useEffect 会在每次 render 后执行里面的函数，这可能会有一些性能问题，接下来就讲一讲如何有条件地执行 useEffect 中的匿名函数。

在上一节的示例上进行扩展一个输入 name 的功能

## Class 组件的写法示例

``` tsx
import React, { Component } from 'react'

interface stateType {
  count: number
  name: string
}

class ClassCounter extends Component {

  state = {
    count: 0,
    name: '',
  }

  componentDidMount() {
    document.title = `${this.state.count} times`
  }

  componentDidUpdate(prevProps: any, prevState: stateType) {
    if (prevState.count !== this.state.count) {
      console.log('Update title')
      document.title = `${this.state.count} times`
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={(e) => {
            this.setState({
              name: e.target.value
            })
          }}
        />
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

![](https://gw.alicdn.com/tfs/TB1aX7.voz1gK0jSZLeXXb9kVXa-610-312.gif)

为了更好的性能，注意代码中判断了 prevState

## 函数式组件的写法

``` tsx
import React, { useState, useEffect } from 'react'

function HookCounter() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  useEffect(() => {
    console.log('useEffect - update title')
    document.title = `You clicked ${count} times`
  }, [count])

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
      />
      <button onClick={() => {
        setCount(prevCount => prevCount + 1)
      }} >Clicked {count} times</button>
    </div>
  )
}

export default HookCounter
```

![](https://gw.alicdn.com/tfs/TB1efJbvAY2gK0jSZFgXXc5OFXa-610-312.gif)

注意到 useEffect 的第二个参数 `[count]`，这个参数是一个数组，元素是要被观察的 state 或 props，只有指定的这个变量发生变化时，才会触发 useEffect 中的第一个参数匿名函数的执行。这有利于性能的保证。
