
import React from 'react'

class ContactPage extends React.Component {
  onSubmit = () => {
    this.props.history.push('/Gridbind')
  }

  render() {
    return (
      <form>
        <input placeholder="name" type="name" />
        <input placeholder="email" type="email" />
        <input type="button" onClick={this.onSubmit} value="Submit"></input>
      </form>
    )
  }
}

export default ContactPage
