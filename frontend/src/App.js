import React, { useState } from 'react'

import logo from './logo.svg';
import './App.css';

function App() {

  const [sentence, setSentence] = useState("")

  const pipeline_health = (e) => {
    e.preventDefault()

    fetch('http://localhost:8000/api/health', {
      method: 'get'
    }).then(res => res.json())
      .then(heartbeat => console.log(heartbeat))
      .catch(function(error) {
        console.error(error)
      });
  }

  const analyze = (e) => {
    e.preventDefault()

    fetch('http://localhost:8000/api/label', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "sentence": sentence
      })
    }).then(res => res.json())
      .then(labels => {
        console.log(labels)
      })
      .catch(function(error) {
        console.error(error)
      });
  }

  return (
    <div className="App">
      <form onSubmit={(e) => analyze(e)}>
        <input type='text' id='sentence' onChange={e =>setSentence(e.target.value)} value={sentence} ></input>
        <input type="submit" value='Analyze'></input>
      </form>
      <button onClick={(e) => pipeline_health(e)}>Heartbeat</button>
    </div>
  );
}

export default App;
