export class ArrayList {
  constructor() {
    this.items = [];
  }
  // 인덱스로 데이터 찾기
  get(index) {
    return this.items[index];
  }
  // 끝에 추가
  add(val) {
    this.items.push(val);
  }
  // 특정 인덱스에 삽입
  insertAt(index, val) {
    this.items.splice(index, 0, val);
  }
  // 특정 인덱스 삭제
  removeAt(index) {
    this.items.splice(index, 1);
  }
  // 마지막 삭제
  removeLast() {
    return this.items.pop();
  }
  toArray() {
    return [...this.items];
  }
}
