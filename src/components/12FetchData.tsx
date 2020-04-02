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
