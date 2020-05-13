import React, { useEffect, useReducer } from 'react'
import axios from 'axios'

interface postType {
  userId: number
  id: number
  title: string
  body: string
}

type stateType = {
  loading: boolean
  error: string
  post?: postType | {}
}

type actionType = {
  type: 'FETCH_SUCCESS' | 'FETCH_ERROR'
  payload?: postType | {}
}

const initialState = {
  loading: true,
  error: '',
  post: {},
}

const reducer = (state: stateType, action: actionType) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        error: '',
        post: action.payload,
      }
    case 'FETCH_ERROR':
      return {
        loading: false,
        error: 'something went wrong',
        post: {},
      }
    default:
      return state
  }
}

function DataFetchingTwo() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1').then((res) => {
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: res.data,
      })
    }).catch(() => {
      dispatch({
        type: 'FETCH_ERROR'
      })
    })
  }, [])

  return (
    <div>
      {
        state.loading
          ? 'Loading...'
          // @ts-ignore
          : state.post.title
      }
      {
        state.error
          ? state.error
          : null
      }
    </div>
  )
}

export default DataFetchingTwo
