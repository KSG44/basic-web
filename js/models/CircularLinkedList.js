class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
export class CircularLinkedList {
  constructor() {
    this.head = null;
  }
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      newNode.next = this.head;
      return;
    }
    let curr = this.head;
    while (curr.next !== this.head) curr = curr.next;
    curr.next = newNode;
    newNode.next = this.head;
  }
  removeFirst() {
    if (!this.head) return;
    if (this.head.next === this.head) {
      this.head = null;
      return;
    }
    let curr = this.head;
    while (curr.next !== this.head) curr = curr.next;
    this.head = this.head.next;
    curr.next = this.head;
  }
  toArray() {
    if (!this.head) return [];
    let arr = [this.head.data],
      curr = this.head.next;
    while (curr !== this.head) {
      arr.push(curr.data);
      curr = curr.next;
    }
    return arr;
  }
}
