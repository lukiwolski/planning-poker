import React from 'react'
import Message from './Message'

export default React.createClass({
  render() {
    return (
      <div className='messages'>
        <h2> Conversation: </h2>
        {
          this.props.messages.map((message, i) => {
            return (
              <Message
                key={i}
                text={message}
                />
            )
          })
        }
      </div>
    )
  }
})
