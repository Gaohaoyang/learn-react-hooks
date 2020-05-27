import { useState } from 'react'

function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue)
  const reset = () => {
    setValue(initialValue)
  }
  const bind = {
    value,
    onChange(e: any) {
      setValue(e.target.value)
    }
  }
  return [value, bind, reset]
}

export default useInput
