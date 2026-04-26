export class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(element) {
    this.items.push(element);
  }
  dequeue() {
    if (this.items.length === 0) return "Underflow";
    return this.items.shift();
  }
  toArray() {
    return [...this.items];
  }
}
