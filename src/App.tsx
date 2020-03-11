import React from 'react'

import './App.css'

// import RunEffectsOnlyOnce from './components/9RunEffectsOnlyOnce'
// import MouseContainer from './components/10MouseContainer'

import IntervalCounter from './components/11Counter'
import IntervalCounterHooks from './components/11IntervalCouterHooks'


const App = () => {
  return (
    <div className="App">
      <IntervalCounter />
      <IntervalCounterHooks />
    </div>
  )
}

export default App
