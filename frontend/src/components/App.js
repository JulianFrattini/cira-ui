import React, { useState } from 'react'
import './../styles/App.css'

import LabelVisualizer from '../packages/labelvisualization/LabelVisualizer'

import msentence4 from '../util/sentences/sentence-4'


function App() {

  const [version, setVersion] = useState("")

  const [sentence, setSentence] = useState(msentence4.sentence)
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

    setLabels(msentence4.labels)

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
      {
        labels.length > 0 &&
        <LabelVisualizer text={sentence} labels={labels}></LabelVisualizer>
      }
    </div>
  );
}

export default App;
