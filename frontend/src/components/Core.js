import React, { useState, useEffect } from 'react'

import LabelVisualizer from '../packages/labelvisualization/LabelVisualizer'
import CEGVisualizer from '../packages/graphvisualization/CEGVisualizer'


function Core() {

    const [fieldSentence, setFieldSentence] = useState("When the red button is pushed or the power fails the system shuts down.")
    const [analyzing, setAnalyzing] = useState(false)

    const [sentence, setSentence] = useState("")
    const [labels, setLabels] = useState([])
    const [ceg, setCeg] = useState(null)

    useEffect(() => {
        if (sentence) {
            fetch('http://localhost:8000/api/label', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "sentence": sentence
                })
            }).then(res => res.json())
                .then(jsonlabels => {
                    setLabels(jsonlabels.labels);
                }).then(() => console.log(labels))
                .then(() => {
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
                    setCeg(graph.graph)
                })
                .then(() => {
                    setAnalyzing(false)
                })
                .catch(function (error) {
                    console.error(error)
                });
        }
    }, [sentence]);

    const analyze = (e) => {
        e.preventDefault();

        setAnalyzing(true)
        setLabels([])
        setCeg({})
        setSentence(fieldSentence)
    }

    return (
        <div className="core">
            <form onSubmit={(e) => analyze(e)}>
                <input type='text' id='sentence' onChange={e => setFieldSentence(e.target.value)} value={fieldSentence} autoFocus></input>
                <input type="submit" value='Analyze'></input>
            </form>
            {!analyzing && labels.length > 0 &&
                <div>
                    <h2>Labels</h2>
                    <LabelVisualizer text={sentence} labels={labels}></LabelVisualizer>
                </div>
            }
            {!analyzing && ceg != null &&
                <div>
                    <h2>Cause-Effect-Graph</h2>
                    <CEGVisualizer ceg={ceg}></CEGVisualizer>
                </div>
            }
        </div>
    );
}

export default Core;