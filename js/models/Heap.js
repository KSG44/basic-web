export class MaxHeap {
  constructor() {
    this.heap = [];
  }

  insert(val) {
    this.heap.push(parseInt(val));
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] >= this.heap[index]) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  extractMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return max;
  }

  heapifyDown() {
    let index = 0;
    const length = this.heap.length;
    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;
      let swap = null;
      if (leftChildIdx < length) {
        if (this.heap[leftChildIdx] > this.heap[index]) swap = leftChildIdx;
      }
      if (rightChildIdx < length) {
        if (
          (swap === null && this.heap[rightChildIdx] > this.heap[index]) ||
          (swap !== null && this.heap[rightChildIdx] > this.heap[leftChildIdx])
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
      index = swap;
    }
  }

  toTree(index = 0) {
    if (index >= this.heap.length) return null;
    return {
      val: this.heap[index],
      idx: index,
      left: this.toTree(2 * index + 1),
      right: this.toTree(2 * index + 2),
    };
  }
}
