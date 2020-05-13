import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface postType {
  userId: number
  id: number
  title: string
  body: string
}

function DataFetchingOne() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [post, setPost] = useState({} as postType)

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1').then((res) => {
      setLoading(false)
      setPost(res.data)
      setError('')
    }).catch(() => {
      setLoading(false)
      setPost({} as postType)
      setError('something went wrong')
    })
  }, [])

  return (
    <div>
      {
        loading
          ? 'Loading...'
          : post.title
      }
      {
        error
          ? error
          : null
      }
    </div>
  )
}

export default DataFetchingOne
