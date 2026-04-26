class Node {
  constructor(val, idx) {
    this.val = val;
    this.idx = idx; // 시각화 ID용
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

export class AVLTree {
  constructor() {
    this.root = null;
    this.nodeCount = 0; // 고유 ID 생성을 위한 카운터
  }

  getHeight(node) { return node ? node.height : 0; }
  getBalance(node) { return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0; }

  // 우회전 (LL Case 해결)
  rotateRight(y) {
    let x = y.left;
    let T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    return x;
  }

  // 좌회전 (RR Case 해결)
  rotateLeft(x) {
    let y = x.right;
    let T2 = y.left;
    y.left = x;
    x.right = T2;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    return y;
  }

  insert(val) {
    this.root = this._insert(this.root, parseInt(val));
  }

  _insert(node, val) {
    if (!node) return new Node(val, this.nodeCount++);

    if (val < node.val) node.left = this._insert(node.left, val);
    else if (val > node.val) node.right = this._insert(node.right, val);
    else return node; // 중복 값은 허용하지 않음

    // 높이 업데이트
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    
    // 균형 인수 계산
    let balance = this.getBalance(node);

    // LL Case
    if (balance > 1 && val < node.left.val) return this.rotateRight(node);
    // RR Case
    if (balance < -1 && val > node.right.val) return this.rotateLeft(node);
    // LR Case
    if (balance > 1 && val > node.left.val) {
      node.left = this.rotateLeft(node.left);
      return this.rotateRight(node);
    }
    // RL Case
    if (balance < -1 && val < node.right.val) {
      node.right = this.rotateRight(node.right);
      return this.rotateLeft(node);
    }

    return node;
  }
}
