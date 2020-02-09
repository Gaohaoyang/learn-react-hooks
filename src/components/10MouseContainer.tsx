import React, { useState } from 'react'

import RunEffectsOnlyOnce from './9RunEffectsOnlyOnce'

function MouseContainer() {
  const [display, setDisplay] = useState(true)
  return (
    <div>
      <button onClick={() => setDisplay(!display)}>Toggle display</button>
      {display && <RunEffectsOnlyOnce />}
    </div>
  )
}

export default MouseContainer
