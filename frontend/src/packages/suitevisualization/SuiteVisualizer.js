import React, { useState, useEffect } from 'react'

import './styles/table.css'

function SuiteVisualizer({ suite }) {

    console.log(suite);

    // determine the order in which the events will be visualized
    let eventorder = suite.conditions.map(event => event.id).concat(suite.expected.map(event => event.id))
    let events = suite.conditions.concat(suite.expected)

    return (
        <table>
            <thead>
                <tr>
                    <th rowSpan="2">ID</th>
                    <th className="th_input" colspan={suite.conditions.length}>Input</th>
                    <th className="th_output" colspan={suite.expected.length}>Output</th>
                </tr>
                <tr>
                    {eventorder.map(eid => (
                        <th key={eid}>{events.find(event => event.id === eid).variable}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {suite.cases.map((config, index) => (
                    <tr>
                        <td>{index+1}</td>
                        {eventorder.map(eid => (
                            <td>{(config[eid] ? '' : 'not ') + events.find(event => event.id === eid).condition}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default SuiteVisualizer;