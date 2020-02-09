import React, { Component } from 'react'

class RunEffectsOnlyOnce extends Component {
  state = {
    x: 0,
    y: 0
  }

  logMousePos = (e: MouseEvent) => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.logMousePos)
  }

  render() {
    return (
      <div>
        Y - {this.state.y}, X - {this.state.x}
      </div>
    )
  }
}

export default RunEffectsOnlyOnce
