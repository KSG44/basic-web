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
        } else {
            if (!node.right) node.right = newNode;
            else this._insertNode(node.right, newNode);
        }
    }
}
