export class ArrayList {
  constructor() {
    this.capacity = 4;
    this.size = 0;
    this.array = new Array(this.capacity);
  }

  _resize() {
    this.capacity *= 2;
    const newArray = new Array(this.capacity);
    for (let i = 0; i < this.size; i++) {
      newArray[i] = this.array[i];
    }
    this.array = newArray;
  }

  add(val) {
    if (this.size === this.capacity) this._resize();
    this.array[this.size] = val;
    this.size++;
  }

  insertAt(index, val) {
    if (index < 0 || index > this.size) return false;
    if (this.size === this.capacity) this._resize();
    for (let i = this.size; i > index; i--) {
      this.array[i] = this.array[i - 1];
    }
    this.array[index] = val;
    this.size++;
    return true;
  }

  removeLast() {
    if (this.size === 0) return null;
    const val = this.array[this.size - 1];
    this.array[this.size - 1] = undefined;
    this.size--;
    return val;
  }

  get(index) {
    if (index < 0 || index >= this.size) return null;
    return this.array[index];
  }

  indexOf(val) {
    for (let i = 0; i < this.size; i++) {
      if (this.array[i] == val) return i;
    }
    return -1;
  }

  sort() {
    const validData = this.array.slice(0, this.size);
    validData.sort((a, b) => {
      if (!isNaN(a) && !isNaN(b)) return Number(a) - Number(b);
      return String(a).localeCompare(String(b));
    });
    for (let i = 0; i < this.size; i++) this.array[i] = validData[i];
  }

  reverse() {
    let left = 0;
    let right = this.size - 1;
    while (left < right) {
      let temp = this.array[left];
      this.array[left] = this.array[right];
      this.array[right] = temp;
      left++;
      right--;
    }
  }

  clear() {
    this.capacity = 4;
    this.size = 0;
    this.array = new Array(this.capacity);
  }

  toArray() {
    return this.array;
  }
}
