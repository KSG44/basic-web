class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}
export class DoublyLinkedList {
    constructor() { this.head = null; this.tail = null; }
    append(data) {
        const newNode = new Node(data);
        if (!this.head) { this.head = this.tail = newNode; return; }
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
    }
    removeLast() {
        if (!this.tail) return;
        if (this.head === this.tail) { this.head = this.tail = null; return; }
        this.tail = this.tail.prev;
        this.tail.next = null;
    }
    toArray() {
        let arr = [], curr = this.head;
        while (curr) { arr.push(curr.data); curr = curr.next; }
        return arr;
    }
}
