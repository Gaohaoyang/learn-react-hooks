import React, { useReducer } from 'react'

const initialState = {
  firstCounter: 0,
  secondCounter: 10,
}
const reducer = (
  state: {
    firstCounter: number
    secondCounter: number
  },
  action: {
    type: string
    value: number
  }
) => {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        firstCounter: state.firstCounter + action.value
      }
    case 'decrement':
      return {
        ...state,
        firstCounter: state.firstCounter - action.value
      }
    case 'increment2':
      return {
        ...state,
        secondCounter: state.secondCounter + action.value
      }
    case 'decrement2':
      return {
        ...state,
        secondCounter: state.secondCounter - action.value
      }
    case 'reset':
      return initialState
    default:
      return state
  }
}

function CounterTwo() {
  const [count, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
      <div>First Count - {count.firstCounter}</div>
      <div>Second Count - {count.secondCounter}</div>
      <button
        onClick={() => dispatch({
          type: 'increment',
          value: 1
        })}
      >Increment</button>
      <button
        onClick={() => dispatch({
          type: 'decrement',
          value: 1
        })}
      >Decrement</button>
      <button
        onClick={() => dispatch({
          type: 'increment',
          value: 5
        })}
      >Increment 5</button>
      <button
        onClick={() => dispatch({
          type: 'decrement',
          value: 5
        })}
      >Decrement 5</button>
      <div>
        <button
          onClick={() => dispatch({
            type: 'increment2',
            value: 1
          })}
        >Increment second</button>
        <button
          onClick={() => dispatch({
            type: 'decrement2',
            value: 1
          })}
        >Decrement second</button>
      </div>
      <button
        onClick={() => dispatch({ type: 'reset', value: 0 })}
      >Reset</button>
    </div>
  )
}

export default CounterTwo
