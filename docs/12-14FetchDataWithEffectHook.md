# Fetch Data with Effect Hook

## 简单获取数据

使用 useEffect 来获取数据，本文使用 axios 库示例。

https://jsonplaceholder.typicode.com/ 网站提供了示例的请求，返回了一些 json 数据。

```jsx
import React, { useState, useEffect } from 'react'

import axios from 'axios'

interface postType {
  userId: number
  id: number
  title: string
  body: string
}

function FetchData() {

  const [posts, setPosts] = useState<postType[]>([])

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
      const data: postType[] = res.data
      console.log(data)
      setPosts(data)
    }).catch((rej) => {
      console.log(rej)
    })
  }, [])

  return (
    <div>
      <ul>
        {
          posts.map((item) => (
            <li
              key={item.id}
            >
              {item.title}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default FetchData
```

![](https://gw.alicdn.com/tfs/TB1UAWCAlr0gK0jSZFnXXbRRXXa-802-814.jpg)

这里注意 ts 在 useState 中的写法。

``` jsx
const [posts, setPosts] = useState<postType[]>([])
```

注意 useEffect 第二个依赖参数传入空数组，保证了 useEffect 只执行一次。

## 输入id获取不同数据

``` tsx
import React, { useState, useEffect } from 'react'

import axios from 'axios'

interface postType {
  userId: number
  id: number
  title: string
  body: string
}

function FetchData() {
  const [post, setPost] = useState<postType>()
  const [id, setId] = useState('1')

  useEffect(() => {
    if (id) {
      axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => {
        const data: postType = res.data
        console.log(data)
        setPost(data)
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [id])

  return (
    <div>
      <input
        type="text"
        value={id}
        onChange={(e) => {
          setId(e.target.value)
        }}
      />
      <div>
        {
          post && post.title
        }
      </div>
    </div>
  )
}

export default FetchData

```

![](https://gw.alicdn.com/tfs/TB1wvCvAXP7gK0jSZFjXXc5aXXa-432-292.gif)

## button 点击触发 effect

监听按钮点击触发变化，执行 effect 方法

``` tsx
import React, { useState, useEffect } from 'react'

import axios from 'axios'

interface postType {
  userId: number
  id: number
  title: string
  body: string
}

function FetchData() {
  const [post, setPost] = useState<postType>()
  const [id, setId] = useState('1')
  const [idFromBtnClick, setIdFromBtnClick] = useState('1')

  useEffect(() => {
    if (idFromBtnClick) {
      axios.get(`https://jsonplaceholder.typicode.com/posts/${idFromBtnClick}`).then((res) => {
        const data: postType = res.data
        console.log(data)
        setPost(data)
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [idFromBtnClick])

  return (
    <div>
      <input
        type="text"
        value={id}
        onChange={(e) => {
          setId(e.target.value)
        }}
      />
      <button
        onClick={() => {
          setIdFromBtnClick(id)
        }}
      >Fetch Post</button>
      <div>
        {
          post && post.title
        }
      </div>
    </div>
  )
}

export default FetchData
```

![](https://gw.alicdn.com/tfs/TB1sH2tAi_1gK0jSZFqXXcpaXXa-432-292.gif)
