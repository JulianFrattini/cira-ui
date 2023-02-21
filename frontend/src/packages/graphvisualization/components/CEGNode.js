import React from "react"

import '../styles/node.css'

import { nodewidth, nodeheight } from "../util/cegconfig.js"

function CEGNode({ node, x, y }) {  
    const posx = x-(nodewidth/2)
    const posy = y-(nodeheight/2)

    return (
        <g>
            <rect x={posx} y={posy} width={nodewidth} height={nodeheight} fill={"#EEEEEE"} stroke="#111111" rx="4"></rect>
            <text className='centeredtext' x={x} y={y-8} fill="#000000" fontWeight='bold'>{node.variable}</text>
            <text className='centeredtext' x={x} y={y+8} fill="#000000">{node.condition}</text>
        </g>
    )
  };

export default CEGNode;
