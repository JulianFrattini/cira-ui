import React from "react"

import CEGNode from "./components/CEGNode"
import CEGJunctor from "./components/CEGJunctor"
import CEGEdge from "./components/CEGEdge"

import { DataGraph } from "./util/DataGraph"
import { nodewidth, nodexbuffer, nodeheight, nodeybuffer } from "./util/cegconfig"

const convertpositionx = function (x) {
  return 10 + x * (nodewidth + nodexbuffer) + nodewidth / 2
}

const convertpositiony = function (y) {
  return 10 + y * (nodeheight + nodeybuffer) + nodeheight / 2
}

function CEGVisualizer({ ceg }) {
  // parse the cause-effect graph
  let cegraph = new DataGraph(ceg)

  // determine the x and y positions of all nodes within the cause-tree
  const causexpos = cegraph.root.getx(cegraph.root.maxdepth() - 1)
  const causeypos = cegraph.root.gety(0)

  // convert the indices to real positions
  Object.keys(causexpos).forEach(function (key, index) {
    causexpos[key] = convertpositionx(causexpos[key])
  })
  Object.keys(causeypos).forEach(function (key, index) {
    causeypos[key] = convertpositiony(causeypos[key])
  })

  // calculate the position of the effect nodes
  cegraph.determineeffectpositions(causexpos, causeypos, causeypos[cegraph.root.id], nodewidth, nodeheight, nodexbuffer, nodeybuffer)

  // calculate the width and height of the graph visualization
  const graphwidth = Math.max.apply(Math, Object.values(causexpos)) + nodewidth/2 + 10
  const graphheight = Math.max.apply(Math, Object.values(causeypos)) + nodeheight/2 + 10

  return (
    <svg width={graphwidth} height={graphheight}>

      {
        // render edges
        cegraph.edges.map((edge, index) => {
          // calculate the correct start- and end- position of the edge
          const x1 = causexpos[edge.origin] + (cegraph.getnode(edge.origin).eventnode ? nodewidth/2 : 30)
          const x2 = causexpos[edge.target] - (cegraph.getnode(edge.target).eventnode ? nodewidth/2 : 30)

          // render the edge
          return <CEGEdge key={index} x1={x1} y1={causeypos[edge.origin]} x2={x2} y2={causeypos[edge.target]} negated={edge.negated}></CEGEdge>
        })
      }

      {
        // render all nodes
        cegraph.nodes.map((item, index) => {
          // render the nodes
          if (item.eventnode) {
            return <CEGNode key={index} node={item} x={causexpos[item.id]} y={causeypos[item.id]}></CEGNode>
          } else {
            return <CEGJunctor key={index} node={item} x={causexpos[item.id]} y={causeypos[item.id]}></CEGJunctor>
          }
        })}

    </svg>
  )
};

export default CEGVisualizer;
