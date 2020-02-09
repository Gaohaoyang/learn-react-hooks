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
