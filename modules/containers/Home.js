import React from 'react'
import Loginform from '../components/Loginform'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState() {
    return {
      inputText: '',
      error: false
    }
  },
  handleSubmitForm(e) {
    e.preventDefault()

    let name = this.state.inputText

    if (!name || name.length <= 3) {
      this.setState({ error: true })
      return
    }

    this.context.router.push('lobby/' + name)
  },
  handleInputChange(e) {
    this.setState({
      inputText: e.target.value
    })
  },
  render() {
    return (
      <Loginform
        onSubmitForm={this.handleSubmitForm}
        onInputChange={this.handleInputChange}
        username={this.state.inputText}
        error={this.state.error}
      />
    )
  }
})
