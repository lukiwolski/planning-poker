import React from 'react'

export default (props) =>
  <div className="message">
    <strong>{props.user}: </strong>
    <span>{props.text}</span>
  </div>
