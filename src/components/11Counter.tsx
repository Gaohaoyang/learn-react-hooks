/**
 * 每秒 +1 的计数器
 */

import React, { Component } from 'react'

class Counter extends Component {

  state = {
    count: 0
  }

  timer: number | undefined

  tick = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  componentDidMount() {
    this.timer = window.setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }


  render() {
    return (
      <div>
        <span>{this.state.count}</span>
      </div>
    )
  }
}

export default Counter
