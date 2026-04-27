export class ArrayList {
  constructor() {
    this.capacity = 4; // 초기 용량
    this.size = 0; // 실제 데이터 개수
    this.array = new Array(this.capacity);
  }

  // 용량이 꽉 찼을 때 2배로 늘리는 내부 메서드
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
    this.array[this.size - 1] = undefined; // 메모리 해제 시뮬레이션
    this.size--;
    return val;
  }

  get(index) {
    if (index < 0 || index >= this.size) return null;
    return this.array[index];
  }

  indexOf(val) {
    for (let i = 0; i < this.size; i++) {
      // 입력값이 문자열일 수 있으므로 동등 연산자 사용
      if (this.array[i] == val) return i;
    }
    return -1;
  }

  sort() {
    // 유효한 데이터만 잘라서 정렬 후 원본에 덮어쓰기
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
    // UI에 빈 공간(Capacity 여분)도 보여주기 위해 전체 배열 반환
    return this.array;
  }
}
