# useState with Object

## 错误示例 firstName & lastName

HookCounter.tsx

``` tsx
import React, { useState } from 'react'

function HookCounter() {

  const [name, setName] = useState({
    firstName: '',
    lastName: ''
  })

  return (
    <form>
      <input
        type="text"
        value={name.firstName}
        onChange={e => {
          setName({
            firstName: e.target.value
          })
        }}
      />
      <input
        type="text"
        value={name.lastName}
        onChange={e => {
          setName({
            lastName: e.target.value
          })
        }}
      />
      <h2>Your first name is {name.firstName}</h2>
      <h2>Your last name is {name.lastName}</h2>
    </form>
  )
}

export default HookCounter
```

注意到 input 标签上的 onChange 中，每次 setName 时，只对对象中的一个属性做了操作。只给 firstName 赋值时，lastName 属性会消失，这是一种错误的写法。

由于我使用了 tsx 来写组件，我的编译器直接就报错了：

![](https://gw.alicdn.com/tfs/TB1q8E0voY1gK0jSZFCXXcwqXXa-1098-822.jpg)

浏览器也直接报错了

![](https://gw.alicdn.com/tfs/TB1FIMVvhD1gK0jSZFsXXbldVXa-910-832.jpg)

## 正确示例

这里要使用展开运算符，来解决这个对象的问题

``` tsx
import React, { useState } from 'react'

function HookCounter() {

  const [name, setName] = useState({
    firstName: '',
    lastName: ''
  })

  return (
    <form>
      <input
        type="text"
        value={name.firstName}
        onChange={e => {
          setName({
            ...name,
            firstName: e.target.value
          })
        }}
      />
      <input
        type="text"
        value={name.lastName}
        onChange={e => {
          setName({
            ...name,
            lastName: e.target.value
          })
        }}
      />
      <h2>Your first name is {name.firstName}</h2>
      <h2>Your last name is {name.lastName}</h2>
      <h2>{JSON.stringify(name)}</h2>
    </form>
  )
}

export default HookCounter
```

![](https://gw.alicdn.com/tfs/TB1mfIUvXY7gK0jSZKzXXaikpXa-373-215.gif)

## 小结

state hook 中操作对象时，不会自动合并对象中的属性，需要我们手动来合并，可以运用展开运算符。

那么，数组也是类似的，见下一篇。
