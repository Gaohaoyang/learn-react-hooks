import React, { useState, useEffect, useRef } from 'react'

function HookTimer() {
  const [timer, setTimer] = useState(0)

  //  @ts-ignore
  const intervalRef = useRef(null) as { current: number }

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setTimer(pre => pre + 1)
    }, 1000)
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])
  return (
    <div>
      HookTimer - {timer}
      <br />
      <button
        onClick={() => {
          clearInterval(intervalRef.current)
        }}
      >Clear Hook Timer</button>
    </div>
  )
}

export default HookTimer
