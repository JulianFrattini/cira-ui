import React, { useState } from 'react'
import './../styles/App.css'

import LabelVisualizer from '../packages/labelvisualization/LabelVisualizer'
import CEGVisualizer from '../packages/graphvisualization/CEGVisualizer'


function App() {

  const [version, setVersion] = useState("")

  const [sentence, setSentence] = useState("When the red button is pushed or the power fails the system shuts down.")
  const [labels, setLabels] = useState([])
  const [ceg, setCeg] = useState(null)

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

    fetch('http://localhost:8000/api/label', {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "sentence": sentence
      })
    }).then(res => res.json())
      .then(labels => {
        //console.log(labels);
        setLabels(labels.labels);
      })
      .then(() => {
        //console.log(typeof(labels));
        //console.log(typeof(labels.labels))
        return fetch('http://localhost:8000/api/graph', {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "sentence": sentence,
            "labels": labels.labels
          })
        });
      })
      .then(res => res.json())
      .then(graph => {
        //console.log(graph)
        setCeg(graph.graph)
      })
      .catch(function(error) {
        console.error(error)
      });
  }

  return (
    <div className="App">
      <form onSubmit={(e) => analyze(e)}>
        <input type='text' id='sentence' onChange={e => setSentence(e.target.value)} value={sentence} ></input>
        <input type="submit" value='Analyze'></input>
      </form>
      {labels.length > 0 && <LabelVisualizer text={sentence} labels={labels}></LabelVisualizer>}
      {ceg != null && <CEGVisualizer ceg={ceg}></CEGVisualizer>}
    </div>
  );
}

export default App;
