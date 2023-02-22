import React from "react"

function CEGEdge({ x1, y1, x2, y2, negated }) {
    // calculate the center of the edge
    let xcenter = (x1 + x2) / 2
    let ycenter = (y1 + y2) / 2

    // calculate the angle of the edge
    const theta = Math.atan2(y1 - y2, x1 - x2)
    const arctheta = theta * 180 / Math.PI

    // define the arrow 
    const arrowlength = 10
    const arrowangle = 0.04 * Math.PI

    return (
        <g>
            {   // if the edge is negated, render a swung dash   
                negated &&
                <g transform={"rotate(" + arctheta + ", " + xcenter + ", " + ycenter + ")"}>
                    <path d={"M " + xcenter + " " + ycenter + " A 2 2 0 0 1 " + (xcenter + 10) + " " + ycenter} stroke="black" fill="white" />
                    <path d={"M " + (xcenter - 10) + " " + ycenter + " A 2 2 0 0 0 " + xcenter + " " + ycenter} stroke="black" fill="white" />
                </g>
            }

            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black"></line>

            <line x1={x2} y1={y2} x2={x2 + Math.cos(theta + arrowangle) * arrowlength} y2={y2 + Math.sin(theta + arrowangle) * arrowlength} stroke="black"></line>
            <line x1={x2} y1={y2} x2={x2 + Math.cos(theta - arrowangle) * arrowlength} y2={y2 + Math.sin(theta - arrowangle) * arrowlength} stroke="black"></line>
        </g>
    )
};

export default CEGEdge;
