import React, { Component } from 'react'

class CounterClass extends Component {

  state = {
    count: 0
  }

  incrementCount = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    const { count } = this.state
    return (
      <div>
        <button onClick={this.incrementCount}>Count {count}</button>
      </div>
    )
  }
}

export default CounterClass
