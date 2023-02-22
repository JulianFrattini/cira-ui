import React from "react"

import '../styles/node.css'

function CEGJunctor({ node, x, y }) {  
    return (
        <g>
            <circle cx={x} cy={y} r='30' stroke="black" fill="#EEEEEE"></circle>
            <text className='centeredtext' x={x} y={y} fill="#000000" fontWeight='bold'>{node.conjunction ? '&&' : '||'}</text>
        </g>
    )
  };

export default CEGJunctor;
