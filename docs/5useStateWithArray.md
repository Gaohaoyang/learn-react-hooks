# useState with Array

## 列表示例

点击按钮，列表增加一个1-10的随机数

UseStateWithArray.tsx

``` tsx
import React, { useState } from 'react'

interface ItemType {
  id: number
  value: number
}

function UseStateWithArray() {
  const [items, setItems] = useState<ItemType[]>([])

  const addItem = () => {
    setItems([
      ...items,
      {
        id: items.length,
        value: Math.ceil(Math.random() * 10)
      }
    ])
  }

  return (
    <div>

      <button onClick={addItem}>add a number</button>
      <ul>
        {
          items.length > 0 && items.map((item: ItemType) => (
            <li key={item.id}>{item.value}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default UseStateWithArray
```

效果如下：

![](https://gw.alicdn.com/tfs/TB1vcE7vXY7gK0jSZKzXXaikpXa-418-215.gif)

注意 typeScript 在 hooks 中的使用方法，可参考如下文章

- [TypeScript 中使用React Hook](https://juejin.im/post/5ce0134b5188256a220235eb)

## useState 总结

关于 useState 的使用就到这里，这里稍作总结。

- 可以在函数式组件中使用 state
- 在类组件中，state 是一个对象，但是 useState 中，state可以不是对象，可以是任何类型
- useState 返回2个元素的数组
  - 第一个是 state 的当前值
  - 第二个是 state 的 setter 方法，调用时会触发 rerender
    - 若当前的 state 依赖 previous state，可以传入一个函数到 state 的 setter 方法中，入参为 previous state，返回新的 state
- 对于对象和数组，注意 state 中不会自动补全旧的变量，需要使用展开运算符自己手动补充

接下来学习 useEffect 的使用。

