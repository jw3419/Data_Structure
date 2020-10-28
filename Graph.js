class Graph {
    constructor() {
        /*
         *  ex)
         *    nodes = {
         *      0: [ 1, 2 ],
         *      1: [ 0 ],
         *      2: [ 0 ]
         *    }
         */
        this.nodes = {};
    }

    addNode(node) {
        this.nodes[node] = this.nodes[node] || [];
    }

    contains(node) {
        return this.nodes[node] ? true : false;
    }

    removeNode(node) {
        this.nodes[node].forEach(function (item) {
            this.removeEdge(node, item);
        })
        delete this.nodes[node]
    }

    hasEdge(fromNode, toNode) {
        if (this.nodes[fromNode] && this.nodes[toNode]) {
            return this.nodes[fromNode].includes(toNode) && this.nodes[toNode].includes(fromNode)
        }
        else {
            return false;
        }
    }

    addEdge(fromNode, toNode) {
        this.nodes[fromNode].push(toNode);
        this.nodes[toNode].push(fromNode);
    }

    removeEdge(fromNode, toNode) {
        this.nodes[fromNode].splice(this.nodes[fromNode].indexOf(toNode), 1);
        this.nodes[toNode].splice(this.nodes[toNode].indexOf(fromNode), 1);
    }
}