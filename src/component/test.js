
import React from 'react'

class TestPage extends React.Component {
  onSubmit = () => {
    this.props.history.push('/contact')
  }

  render() {
    return (
      <form>
      
        <input type="button" onClick={this.onSubmit} value="Test"></input>
      </form>
    )
  }
}

export default TestPage
