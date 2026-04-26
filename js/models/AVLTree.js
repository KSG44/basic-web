class Node {
  constructor(val, idx) {
    this.val = val;
    this.idx = idx;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

export class AVLTree {
  constructor() {
    this.root = null;
    this.nodeCount = 0;
  }

  getHeight(node) {
    return node ? node.height : 0;
  }
  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  rotateRight(y) {
    let x = y.left;
    let T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    return x;
  }

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
    else return node;

    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    let balance = this.getBalance(node);

    if (balance > 1 && val < node.left.val) return this.rotateRight(node);

    if (balance < -1 && val > node.right.val) return this.rotateLeft(node);

    if (balance > 1 && val > node.left.val) {
      node.left = this.rotateLeft(node.left);
      return this.rotateRight(node);
    }

    if (balance < -1 && val < node.right.val) {
      node.right = this.rotateRight(node.right);
      return this.rotateLeft(node);
    }

    return node;
  }
}
