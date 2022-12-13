import React, { useState } from 'react'

import LabelView from '../packages/labelvis/LabelView'

import './../styles/App.css'

function App() {

  const [version, setVersion] = useState("")

  const [sentence, setSentence] = useState("If a user registers then the server sends a welcome message to him.")
  const [labels, setLabels] = useState([])

  const pipeline_health = (e) => {
    e.preventDefault()
    setVersion('v1.0')
    /*fetch('http://localhost:8000/api/health', {
      method: 'get'
    }).then(res => res.json())
      .then(heartbeat => console.log(heartbeat))
      .catch(function(error) {
        console.error(error)
      });*/
  }

  const analyze = (e) => {
    e.preventDefault()

    setLabels([
      {
        "id": "L0",
        "name": "Cause1",
        "begin": 3,
        "end": 19,
        "successor": {
          "id": "L1",
          "junctor": null
        },
        "children": [
          "L2",
          "L4"
        ]
      },
      {
        "id": "L1",
        "name": "Effect1",
        "begin": 25,
        "end": 66,
        "successor": null,
        "children": [
          "L3",
          "L5"
        ]
      },
      {
        "id": "L2",
        "name": "Variable",
        "begin": 3,
        "end": 9,
        "parent": "L0"
      },
      {
        "id": "L3",
        "name": "Variable",
        "begin": 25,
        "end": 35,
        "parent": "L1"
      },
      {
        "id": "L4",
        "name": "Condition",
        "begin": 10,
        "end": 19,
        "parent": "L0"
      },
      {
        "id": "L5",
        "name": "Condition",
        "begin": 36,
        "end": 66,
        "parent": "L1"
      }
    ])

    /*fetch('http://localhost:8000/api/label', {
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
      });*/
  }

  return (
    <div className="App">
      <form onSubmit={(e) => analyze(e)}>
        <input type='text' id='sentence' onChange={e => setSentence(e.target.value)} value={sentence} ></input>
        <input type="submit" value='Analyze'></input>
      </form>
      <div id='bratcanvas'></div>
      <LabelView sentence={sentence} labels={labels}></LabelView>
    </div>
  );
}

export default App;
