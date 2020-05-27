import React, { FormEvent } from 'react'
import useInput from './hooks/useInput'

function UserForm() {

  const [firstName, bindFirstName, resetFirstName] = useInput('')
  const [lastName, bindLastName, resetLastName] = useInput('')

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    console.log(`Hello ${firstName} ${lastName}`)
    // @ts-ignore
    resetFirstName()
    // @ts-ignore
    resetLastName()
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="">First name</label>
          <input
            type="text"
            {...bindFirstName}
          />
        </div>
        <div>
          <label htmlFor="">Last name</label>
          <input
            type="text"
            {...bindLastName}
          />
        </div>
        <button>submit</button>
      </form>
    </div>
  )
}

export default UserForm
