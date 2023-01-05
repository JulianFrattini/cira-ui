import Annotation from "./components/Annotation";

import React, { useState, useEffect } from 'react'

function LabelVisualizer({ text, labels }) {

    // the renderlabels variable contains all labels that are supposed to be rendered
    const [renderlabels, setRenderlabels] = useState([])

    useEffect(() => {
        // once the component (especially the sentence) is rendered, make the labels eligible for rendering as well
        setRenderlabels(labels);
    }, []);

    // determine the position of a character within a rendered text element
    const getposition = (index) => {
        var sen = document.getElementById("svgsentence")
        const position = sen.getStartPositionOfChar(index).x
        return parseInt(position)
    }

    return (
        <svg width="800" height="60">
            {
                renderlabels.map((item, index) => {
                    return <Annotation key={index} x={getposition(item.begin)} y="40" width={getposition(item.end) - getposition(item.begin)} type={item.name}></Annotation>
                })
            }
            <text id="svgsentence" x="5" y="55" fill="black">{text}</text>
        </svg>
    );
}

export default LabelVisualizer;