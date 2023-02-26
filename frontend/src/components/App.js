import React, { useState, useEffect } from 'react'
import './../styles/App.css'

import Core from './Core'

function App() {

  const [version, setVersion] = useState("")


  // get the heartbeat
  fetch('http://localhost:8000/api/health', {
    method: 'get'
  }).then(res => res.json())
    .then(heartbeat => setVersion(heartbeat["cira-version"]))
    .catch(function (error) {
      console.error(error)
    });


  return (
    <div className="App">
      <p>{version}</p>
      <Core></Core>
    </div>
  )
}

export default App;
