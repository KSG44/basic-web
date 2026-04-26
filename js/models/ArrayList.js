export class ArrayList {
  constructor() {
    this.items = [];
  }

  get(index) {
    return this.items[index];
  }

  add(val) {
    this.items.push(val);
  }

  insertAt(index, val) {
    this.items.splice(index, 0, val);
  }

  removeAt(index) {
    this.items.splice(index, 1);
  }

  removeLast() {
    return this.items.pop();
  }
  toArray() {
    return [...this.items];
  }
}
