import { DataEdge } from "./DataEdge";
import { DataNode } from "./DataNode";

export class DataGraph {
  constructor(cegobj) {
    // parse all nodes and determine the root node
    this.nodes = cegobj.nodes.map((node) => new DataNode(node));
    this.root = this.getnode(cegobj.root);

    // parse all edges by connecting all nodes but maintain edges itself
    cegobj.edges.map((edge) => this.getnode(edge.origin).setout(this.getnode(edge.target)));
    this.edges = cegobj.edges.map((edge) => new DataEdge(edge));

    // determine the causes and effects of the cause-effect graph
    this.effects = this.nodes.filter((node) => node.outgoing.length === 0);
    this.causes = this.nodes.filter((node) => node.outgoing.length > 0);
  }

  getnode(id) {
    return this.nodes.find(node => node.id === id);
  };

  determineeffectpositions(causexpos, causeypos, rooty, nodewidth, nodeheight, nodexbuffer, nodeybuffer) {
    // determine the x position of a node
    let nodex = Math.max.apply(Math, Object.values(causexpos)) + nodexbuffer + nodewidth

    // determine the x and y positions of all effects
    this.effects.forEach((item, index) => {
      // determine the y-position of the root node of the cause tree
      //let rooty = causeypos[cegraph.root.id]
      // determine the y-position of the first effect, which is the top-most node
      let nodeybase = rooty - ((this.effects.length - 1) / 2) * (nodeheight + nodeybuffer)
      // determine the y-position of the current effect, which is located at a given index
      let nodey = nodeybase + index * (nodeheight + 10)

      causexpos[item.id] = nodex
      causeypos[item.id] = nodey
    })
  }
}
