export class Deque {
    constructor() { this.items = []; }
    addFront(val) { this.items.unshift(val); }
    addBack(val) { this.items.push(val); }
    removeFront() { return this.items.shift(); }
    removeBack() { return this.items.pop(); }
    toArray() { return [...this.items]; }
}
