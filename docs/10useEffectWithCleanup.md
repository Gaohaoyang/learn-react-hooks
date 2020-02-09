# useEffect With Cleanup

本节研究如何实现 willUnmount 这个生命周期

## 显示与移除组件

共三个文件，结构如下

``` plantuml

skinparam style strictuml

App -- MouseContainer
MouseContainer -- MousePos

```

App.tsx
``` tsx
import React from 'react'

import './App.css'

import MouseContainer from './components/10MouseContainer'

const App = () => {
  return (
    <div className="App">
      <MouseContainer />
    </div>
  )
}

export default App

```

MouseContainer.tsx

``` tsx
import React, { useState } from 'react'

import RunEffectsOnlyOnce from './9RunEffectsOnlyOnce'

function MouseContainer() {
  const [display, setDisplay] = useState(true)
  return (
    <div>
      <button onClick={() => setDisplay(!display)}>Toggle display</button>
      {display && <RunEffectsOnlyOnce />}
    </div>
  )
}

export default MouseContainer
```

MousePos

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

![](https://gw.alicdn.com/tfs/TB1nYXavEH1gK0jSZSyXXXtlpXa-579-284.gif)

执行后发现隐藏了位置组件后，有一个错误警告。这是因为没有正确卸载子组件导致的。mousemove 事件依然被监听着和执行。并且可能会导致内存泄露。

## componentWillUnmount

因此要在卸载组件时，确保所有的监听和订阅都已经被移除。若是在 Class 组件中，可以如下代码

``` js
componentWillUnmount() {
  document.removeEventListener('mousemove', this.logMousePos)
}
```

但是在 useEffect 该如何写呢？请往下看

``` tsx
  useEffect(() => {
    console.log('addEventListener')
    document.addEventListener('mousemove', logMousePos)
    return () => {
      document.removeEventListener('mousemove', logMousePos)
    }
  }, [])
```

在 useEffect 的第一个参数中添加一个 return 匿名函数，这个匿名函数将在组件卸载的时候执行，因此我们在这里移除监听就好了。

![](https://gw.alicdn.com/tfs/TB1eAcBvX67gK0jSZPfXXahhFXa-579-284.gif)


## 小结

如果需要一些在组件卸载时清除功能的代码，就写在 useEffect 第一个参数的返回匿名函数中吧。
