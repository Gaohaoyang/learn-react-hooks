import React, { useState, useMemo } from 'react'

function Counter() {
  const [counterOne, setCounterOne] = useState(0)
  const [counterTwo, setCounterTwo] = useState(0)

  const incrementOne = () => {
    setCounterOne(counterOne + 1)
  }

  const incrementTwo = () => {
    setCounterTwo(counterTwo + 1)
  }

  const isEven = useMemo(() => {
    let i = 0
    while (i < 1000000000) i += 1
    return counterOne % 2 === 0
  }, [counterOne])

  return (
    <div>
      <button
        onClick={incrementOne}
      >Count One = {counterOne}</button>
      <span>
        {
          isEven ? 'even' : 'odd'
        }
      </span>
      <br />
      <button
        onClick={incrementTwo}
      >Count Two = {counterTwo}</button>
    </div>
  )
}

export default Counter
