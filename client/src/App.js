import React from 'react';
import './styles/App.css';
import api from './api/axiosInstance';

function App() {
  return (
    <div className="mainBody">
      <h1>Permissions Granted!</h1>
      <p>Go back to Todoist and Continue.</p>
      <img className="primaryImage" src="/todoist-success.png" alt="Successfully logged into Todoist" />
    </div>
  );
}

export default App;
