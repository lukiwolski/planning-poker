import React from 'react'

export default ({ onSubmitForm, onInputChange, username, error }) =>
<form onSubmit={onSubmitForm}>
  <input
    type="text"
    placeholder="Your name"
    value={username}
    onChange={onInputChange}
  />
  <button >
    Ok
  </button>
  {error && (<p>Your name has to be at least 4 characters long</p>)}
</form>
