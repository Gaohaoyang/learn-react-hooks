import React, { useState, useCallback } from 'react'
import Title from './26Title'
import Count from './26Count'
import Button from './26Button'

function ParentComponenet() {
  const [age, setAge] = useState(29)
  const [salary, setSalary] = useState(50000)

  const incrementAge = useCallback(
    () => {
      setAge(age + 1)
    },
    [age],
  )

  const incrementSalary = useCallback(
    () => {
      setSalary(salary + 1000)
    },
    [salary],
  )

  return (
    <div>
      <Title />
      <Count
        text="Age"
        count={age}
      />
      <Button
        handleClick={incrementAge}
      >Increment age</Button>
      <Count
        text="Salary"
        count={salary}
      />
      <Button
        handleClick={incrementSalary}
      >Increment salary</Button>
    </div>
  )
}

export default ParentComponenet
