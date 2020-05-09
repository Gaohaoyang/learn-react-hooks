# use Context Hook

## 什么是 Context Api

考虑这样一种场景，如果组件树结构如下，现在想从根节点传递一个 userName 的属性到叶子节点 A D F，通过 props 的方式传递，会不可避免的传递通过 B C E，即使这些组件也没有使用这个 userName 属性。

![](https://gw.alicdn.com/tfs/TB1Nl38AAT2gK0jSZFkXXcIQFXa-1432-870.png)

如果这样的嵌套树形结构有5层或10层，那么将是灾难式的开发维护体验。如果能不经过中间的节点直接到达需要的地方就可以避免这种问题，这时 Context api 就是来解决这个问题的。

Context api 是在组件树中传递数据但不用每层都经过的一种 api。下面我们一起看看 Context Hook 的使用方法。

## 使用 Context

我们举个例子重点看下最右边的分支，C E F，从根节点传递一个变量 username 到 F 节点。

我们先创建好 App, ComponentC, ComponentE, ComponentF, 如下

App.tsx

``` tsx
import React from 'react'

import './App.css'

import ComponentC from './components/16ComponentC'

const App = () => {
  return (
    <div className="App">
      <ComponentC />
    </div>
  )
}

export default App
```

ComponentC.tsx

```tsx
import React from 'react'

import ComponentE from './16ComponentE'

function ComponentC() {
  return (
    <div>
      <ComponentE />
    </div>
  )
}

export default ComponentC

```

ComponentE.tsx

```tsx
import React from 'react'

import ComponentF from './16ComponentF'

function ComponentE() {
  return (
    <div>
      <ComponentF />
    </div>
  )
}

export default ComponentE

```

ComponentF.tsx

```tsx
import React from 'react'

function ComponentF() {
  return (
    <div>
      ComponentF
    </div>
  )
}

export default ComponentF
```

页面展示如下：

![](https://gw.alicdn.com/tfs/TB1_nrMFkL0gK0jSZFAXXcA9pXa-438-193.png)

接下来我们来研究如何使用 Context 将 username 从 App 传递到 ComponentF，共分为以下3个步骤

### 创建 context

在根节点 App.tsx 中使用 `createContext()` 来创建一个 context

``` js
const UserContext = React.createContext('')
```

> 创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。
>
> 只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。这有助于在不使用 Provider 包装组件的情况下对组件进行测试。注意：将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效。

### 提供 Provider

在根节点中使用 Provider 包裹子节点，将 context 提供给子节点

``` js
<UserContext.Provider value={'chuanshi'}>
  <ComponentC />
</UserContext.Provider>
```

> 每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。
>
> Provider 接收一个 `value` 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。
>
> 当 Provider 的 `value` 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 `shouldComponentUpdate` 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。
>
> 通过新旧值检测来确定变化，使用了与 Object.is 相同的算法。


别忘了将之前定义好的 Context export 出去，以便在子孙节点中引入

``` js
export const UserContext = React.createContext('')
```

此时 App.tsx 的完整代码为

``` tsx
import React from 'react'

import './App.css'

import ComponentC from './components/16ComponentC'

export const UserContext = React.createContext('')

const App = () => {
  return (
    <div className="App">
      <UserContext.Provider value={'chuanshi'}>
        <ComponentC />
      </UserContext.Provider>
    </div>
  )
}

export default App
```

### 在使用的节点处消费 Context

import context 对象

``` js
import { UserContext } from '../App'
```

使用 Consumer 进行消费

``` js
<UserContext.Consumer>
  {
    (user) => (
      <div>
        User context value {user}
      </div>
    )
  }
</UserContext.Consumer>
```

> 这里，React 组件也可以订阅到 context 变更。这能让你在函数式组件中完成订阅 context。
>
> 这需要函数作为子元素（function as a child）这种做法。这个函数接收当前的 context 值，返回一个 React 节点。传递给函数的 value 值等同于往上组件树离这个 context 最近的 Provider 提供的 value 值。如果没有对应的 Provider，value 参数等同于传递给 createContext() 的 defaultValue。

完整的 ComponentF.tsx 代码如下

``` tsx
import React from 'react'

import { UserContext } from '../App'

function ComponentF() {
  return (
    <div>
      <UserContext.Consumer>
        {
          (user) => (
            <div>
              User context value {user}
            </div>
          )
        }
      </UserContext.Consumer>
    </div>
  )
}

export default ComponentF
```

效果如下

![](https://gw.alicdn.com/tfs/TB1CSB6FpT7gK0jSZFpXXaTkpXa-448-210.png)

目前看只有1个 Context 的时候情况还好，下面我们来看看有多个 Context 的情况

### 多个 Context 情况

