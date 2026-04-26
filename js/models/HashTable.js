export class HashTable {
  constructor(size = 5) {
    this.table = new Array(size).fill(null).map(() => []);
  }
  _hash(key) {
    let total = 0;
    for (let i = 0; i < key.length; i++) total += key.charCodeAt(i);
    return total % this.table.length;
  }
  put(key) {
    const index = this._hash(key);
    this.table[index].push(key);
  }
  getTable() {
    return this.table;
  }
}
