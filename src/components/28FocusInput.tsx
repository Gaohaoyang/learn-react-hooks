import React, { useEffect, useRef} from 'react'

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current && inputRef.current.focus()
  }, [])

  return (
    <div>
      <input ref={inputRef} type="text" />
    </div>
  )
}

export default FocusInput
