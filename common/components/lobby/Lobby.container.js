import React from 'react';
import Chat from '../chat/Message.container';
import auth from '../../utils/auth';

const name = auth.getToken();

const Lobby = () =>
  <div>
    <h1>Dashboard</h1>
    <p>You made it as: {name}</p>
    <Chat user={name} />
  </div>;

export default Lobby;
