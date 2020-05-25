import React, { Component } from 'react'

export default class ClassTimer extends Component<{}, { timer: number }> {
  interval
  constructor(props) {
    super(props)

    this.state = {
       timer: 0
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(prevState => ({timer: prevState.timer + 1}))
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }


  render() {
    return (
      <div>

      </div>
    )
  }
}
