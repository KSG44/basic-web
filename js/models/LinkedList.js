class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

export class LinkedList {
    constructor() {
        this.head = null;
    }
    append(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let curr = this.head;
        while (curr.next) curr = curr.next;
        curr.next = newNode;
    }
    insertAt(data, index) {
        const newNode = new Node(data);
        if (index === 0) {
            newNode.next = this.head;
            this.head = newNode;
            return;
        }
        let curr = this.head, prev = null, i = 0;
        while (i < index && curr) {
            prev = curr;
            curr = curr.next;
            i++;
        }
        newNode.next = curr;
        if (prev) prev.next = newNode;
    }
    removeFirst() {
        if (this.head) this.head = this.head.next;
    }
    toArray() {
        let arr = [], curr = this.head;
        while (curr) {
            arr.push(curr.data);
            curr = curr.next;
        }
        return arr;
    }
}
