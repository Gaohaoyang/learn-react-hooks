import React, { useState, useEffect } from 'react'

function RunEffectsOnlyOnce() {

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const logMousePos = (e: MouseEvent) => {
    setX(e.clientX)
    setY(e.clientY)
  }

  useEffect(() => {
    console.log('addEventListener')
    document.addEventListener('mousemove', logMousePos)
    return () => {
      document.removeEventListener('mousemove', logMousePos)
    }
  }, [])

  return (
    <div>
      Y - {y}, X - {x}
    </div>
  )
}

export default RunEffectsOnlyOnce
