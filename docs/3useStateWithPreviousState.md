# Use State with Previous State

本篇讲述如何使用 previous state

依然通过 Counter 的例子说明

## Counter 示例

HookCounter.tsx

``` tsx
import React, { useState } from 'react'

function HookCounter() {

  const initialCount = 0
  const [count, setCount] = useState(initialCount)

  return (
    <div>
      Count: {count}
      <button onClick={() => {
        setCount(initialCount)
      }}>Reset</button>
      <button onClick={() => {
        setCount(count + 1)
      }}> + 1 </button>
      <button onClick={() => {
        setCount(count - 1)
      }}> - 1 </button>
    </div>
  )
}

export default HookCounter
```

App.tsx

``` tsx
import React from 'react'

import './App.css'

import HookCounter from './components/3HookCounter'

const App = () => {
  return (
    <div className="App">
      <HookCounter />
    </div>
  )
}

export default App
```

效果如下：

![](https://gw.alicdn.com/tfs/TB13LIYva61gK0jSZFlXXXDKFXa-306-179.gif)

看起来效果没有问题，**但是这样写是不安全的**！这不是更改计数器的正确方法。下面告诉你为什么：

同样也是举个例子，在上述的示例中再增加一个按钮，每次累加5

代码如下

``` diff
import React, { useState } from 'react'

function HookCounter() {

  const initialCount = 0
  const [count, setCount] = useState(initialCount)

+  const increment5 = () => {
+    for (let i = 0; i < 5; i++) {
+      setCount(count + 1)
+    }
+  }

  return (
    <div>
      Count: {count}
      <button onClick={() => {
        setCount(initialCount)
      }}>Reset</button>
      <button onClick={() => {
        setCount(count + 1)
      }}> + 1 </button>
      <button onClick={() => {
        setCount(count - 1)
      }}> - 1 </button>
+      <button onClick={increment5}> + 5 </button>
    </div>
  )
}

export default HookCounter
```

点击 + 5 时，只加了 1

![](https://gw.alicdn.com/tfs/TB1AdMTvoz1gK0jSZLeXXb9kVXa-306-179.gif)

这是因为 setCount 方法入参中的 count 仍然是旧的值，没有被更新。

将代码修改如下：

``` diff
import React, { useState } from 'react'

function HookCounter() {

  const initialCount = 0
  const [count, setCount] = useState(initialCount)

  const increment5 = () => {
    for (let i = 0; i < 5; i++) {
+      setCount(prevCount => prevCount + 1)
    }
  }

  return (
    <div>
      Count: {count}
      <button onClick={() => {
        setCount(initialCount)
      }}>Reset</button>
      <button onClick={() => {
        setCount(count + 1)
      }}> + 1 </button>
      <button onClick={() => {
        setCount(count - 1)
      }}> - 1 </button>
      <button onClick={increment5}> + 5 </button>
    </div>
  )
}

export default HookCounter
```

![](https://gw.alicdn.com/tfs/TB1ZG3WvkL0gK0jSZFAXXcA9pXa-306-179.gif)

注意到如果要使用 previous state，则需要通过 function 的方式传入 value 再返回变化后的新 value，将 `+ 1` `-1` 的功能也修改一下，完善后的代码如下：

``` tsx
import React, { useState } from 'react'

function HookCounter() {

  const initialCount = 0
  const [count, setCount] = useState(initialCount)

  const increment5 = () => {
    for (let i = 0; i < 5; i++) {
      setCount(prevCount => prevCount + 1)
    }
  }

  return (
    <div>
      Count: {count}
      <button onClick={() => {
        setCount(initialCount)
      }}>Reset</button>
      <button onClick={() => {
        setCount(prevCount => prevCount + 1)
      }}> + 1 </button>
      <button onClick={() => {
        setCount(prevCount => prevCount - 1)
      }}> - 1 </button>
      <button onClick={increment5}> + 5 </button>
    </div>
  )
}

export default HookCounter
```

## 小结

使用 previousState 时，要使用 setter function 的方式，传参给 setState 方法。来确保拿到的是准确的previous state
