class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

export class BST {
  constructor() {
    this.root = null;
  }

  // 1. 삽입 로직
  insert(val) {
    const newNode = new TreeNode(parseInt(val));
    if (!this.root) {
      this.root = newNode;
      return;
    }
    this._insertNode(this.root, newNode);
  }

  _insertNode(node, newNode) {
    if (newNode.val < node.val) {
      if (!node.left) node.left = newNode;
      else this._insertNode(node.left, newNode);
    } else if (newNode.val > node.val) {
      if (!node.right) node.right = newNode;
      else this._insertNode(node.right, newNode);
    }
  }

  // 2. 값 검색 및 경로 추적 로직
  searchPath(val) {
    let path = [];
    let curr = this.root;
    const target = parseInt(val);
    
    while (curr) {
      path.push(curr); 
      if (target === curr.val) return path;
      curr = target < curr.val ? curr.left : curr.right;
    }
    return path; 
  }

  // 3. 중위 순회 (Left -> Root -> Right)
  inorder(node, result = []) {
    if (node) {
      this.inorder(node.left, result);
      result.push(node.val);
      this.inorder(node.right, result);
    }
    return result;
  }

  // 4. 전위 순회 (Root -> Left -> Right)
  preorder(node, result = []) {
    if (node) {
      result.push(node.val);
      this.preorder(node.left, result);
      this.preorder(node.right, result);
    }
    return result;
  }

  // 5. 후위 순회 (Left -> Right -> Root)
  postorder(node, result = []) {
    if (node) {
      this.postorder(node.left, result);
      this.postorder(node.right, result);
      result.push(node.val);
    }
    return result;
  }

  // 6. 삭제 로직
  delete(val) {
    this.root = this._deleteNode(this.root, parseInt(val));
  }

  _deleteNode(node, val) {
    if (!node) return null;
    if (val < node.val) {
      node.left = this._deleteNode(node.left, val);
      return node;
    } else if (val > node.val) {
      node.right = this._deleteNode(node.right, val);
      return node;
    } else {
      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let temp = this._findMin(node.right);
      node.val = temp.val;
      node.right = this._deleteNode(node.right, temp.val);
      return node;
    }
  }

  _findMin(node) {
    while (node.left) node = node.left;
    return node;
  }
}
