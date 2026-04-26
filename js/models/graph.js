export class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(v1, v2) {
    if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
      if (!this.adjacencyList[v1].includes(v2)) this.adjacencyList[v1].push(v2);
      if (!this.adjacencyList[v2].includes(v1)) this.adjacencyList[v2].push(v1); // 무방향 그래프 기준
    }
  }

  getVertices() {
    return Object.keys(this.adjacencyList);
  }
  getEdges() {
    const edges = [];
    const seen = new Set();
    for (let v in this.adjacencyList) {
      for (let neighbor of this.adjacencyList[v]) {
        const pair = [v, neighbor].sort().join("-");
        if (!seen.has(pair)) {
          edges.push([v, neighbor]);
          seen.add(pair);
        }
      }
    }
    return edges;
  }
}
