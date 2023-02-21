
export class DataNode {
  constructor(nodeobj) {
    // determine the id of the node 
    this.id = nodeobj.id;

    // determine the type of node (event node or junctor) and store relevant information
    if ('variable' in nodeobj) {
      this.variable = nodeobj.variable;
      this.condition = nodeobj.condition;
      this.eventnode = true;
    } else {
      this.conjunction = nodeobj.conjunction;
      this.eventnode = false;
    }

    // setup the connections of the node
    this.incoming = [];
    this.outgoing = [];
  }

  setout(node) {
    this.outgoing.push(node);
    node.incoming.push(this);
  };

  getnodesatdepth(depth) {
    if (depth > 0) {
      let dnodes = [];
      this.incoming.forEach((child) => {
        dnodes = dnodes.concat(child.getnodesatdepth(depth - 1));
      });
      return dnodes;
    } else {
      return [this];
    }
  };

  maxdepth() {
    if (this.incoming.length > 0) {
      this.depth = this.incoming.map((node) => node.maxdepth());
      this.mdepth = Math.max.apply(Math, this.depth);
      return this.mdepth + 1;
    }
    return 1;
  };

  gety(y) {
    let positions = {};

    if (this.incoming.length === 0) {
      positions[this.id] = y;
    } else {
      // determine the positions of all children
      let offset = 0;
      this.incoming.forEach((child, index) => {
        let childpositions = child.gety(y + index + offset);
        offset = Math.max.apply(Math, Object.values(childpositions)) - y - index;
        positions = Object.assign(positions, childpositions);
      });

      // determine own position
      let childids = this.incoming.map((child) => child.id);
      let immediatechildpositions = Object.keys(positions)
        .filter((key) => childids.includes(key))
        .reduce((cur, key) => { return Object.assign(cur, { [key]: positions[key] }); }, {});
      let values = Object.values(immediatechildpositions);
      positions[this.id] = (Math.max.apply(Math, values) + Math.min.apply(Math, values)) / 2;
    }

    return positions;
  };

  getx(x) {
    let positions = {};

    if (this.incoming.length === 0) {
      positions[this.id] = x;
    } else {
      // determine the positions of all children
      this.incoming.forEach((child) => {
        let childpositions = child.getx(x - 1);
        positions = Object.assign(positions, childpositions);
      });

      // determine own position
      positions[this.id] = x;
    }

    return positions;
  };
}
