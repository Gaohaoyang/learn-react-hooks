import React from 'react'

function Button(props: {
  handleClick: () => void
  children: string
}) {
  console.log('Rendering button', props.children)
  return (
    <button onClick={props.handleClick}>
      {props.children}
    </button>
  )
}

export default React.memo(Button)
