import React, { Component } from 'react'

interface stateType {
  count: number
  name: string
}

class ClassCounter extends Component {

  state = {
    count: 0,
    name: '',
  }

  componentDidMount() {
    document.title = `${this.state.count} times`
  }

  componentDidUpdate(prevProps: any, prevState: stateType) {
    if (prevState.count !== this.state.count) {
      console.log('Update title')
      document.title = `${this.state.count} times`
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={(e) => {
            this.setState({
              name: e.target.value
            })
          }}
        />
        <button onClick={() => {
          this.setState({
            count: this.state.count + 1
          })
        }}>
          Clicked {this.state.count} times
        </button>

      </div>
    )
  }
}

export default ClassCounter
