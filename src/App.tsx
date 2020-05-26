import React from 'react'
import './App.css'

import ClassTimer from './components/29ClassTimer'
import HookTimer from './components/29HookTimer'

const App = () => {
  return (
    <div className="App">
      <ClassTimer />
      <hr />
      <HookTimer />
    </div>
  )
}

export default App
