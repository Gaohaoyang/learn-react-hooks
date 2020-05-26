import React, { Component } from 'react'

export default class ClassTimer extends Component<{}, { timer: number }> {
  interval!: number
  constructor(props: Readonly<{}>) {
    super(props)
    this.state = {
      timer: 0
    }
  }

  componentDidMount() {
    this.interval = window.setInterval(() => {
      this.setState(prevState => ({
        timer: prevState.timer + 1
      }))
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div>
        Timer - {this.state.timer}
        <br/>
        <button
          onClick={() => {
            clearInterval(this.interval)
          }}
        >Clear Timer</button>
      </div>
    )
  }
}
