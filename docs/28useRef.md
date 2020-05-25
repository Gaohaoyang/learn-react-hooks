接下来我们要一起学习 useRef hook，它可以让我们直接访问到组件中的的 Dom 节点。我们今天通过一个 input 输入框获取焦点的需求为例，来学习一下 useRef。

## 页面载入 input 获取焦点示例

FocusInput.tsx

``` tsx
import React, { useEffect, useRef} from 'react'

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current && inputRef.current.focus()
  }, [])

  return (
    <div>
      <input ref={inputRef} type="text" />
    </div>
  )
}

export default FocusInput
```

App.tsx

``` tsx
import React from 'react'
import './App.css'

import FocusInput from './components/28FocusInput'

const App = () => {
  return (
    <div className="App">
      <FocusInput />
    </div>
  )
}

export default App
```

页面展示效果

![](https://gw.alicdn.com/tfs/TB1lxWlHkY2gK0jSZFgXXc5OFXa-363-125.gif)

注意与 TypeScript 结合使用时的方式，需要先声明好泛型

``` jsx
const inputRef = useRef<HTMLInputElement>(null)
```

同时使用时需要判空

``` jsx
inputRef.current && inputRef.current.focus()
```

关于 ts 和 hooks 结合的方式可以参考文章 [TypeScript and React: Hooks](https://fettblog.eu/typescript-react/hooks/#useref)。

> `useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。

Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。

在典型的 React 数据流中，props 是父组件与子组件交互的唯一方式。要修改一个子组件，你需要使用新的 props 来重新渲染它。但是，在某些情况下，你需要在典型数据流之外强制修改子组件。被修改的子组件可能是一个 React 组件的实例，也可能是一个 DOM 元素。对于这两种情况，React 都提供了解决办法。

### 下面是几个适合使用 refs 的情况

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

避免使用 refs 来做任何可以通过声明式实现来完成的事情。举个例子，避免在 Dialog 组件里暴露 open() 和 close() 方法，最好传递 isOpen 属性。

### 勿过度使用 Refs

你可能首先会想到使用 refs 在你的 app 中“让事情发生”。如果是这种情况，请花一点时间，认真再考虑一下 state 属性应该被安排在哪个组件层中。通常你会想明白，让更高的组件层级拥有这个 state，是更恰当的。查看 状态提升 以获取更多有关示例。

更多关于 refs 和 Dom 的相关信息可以访问 React 官网 [Refs and the DOM](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html)

下面我们再来学习一下 useRef 在另一个场景的使用。
