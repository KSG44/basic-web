window.onload = function() {
    // 1. Stack
    const stack = [];
    document.getElementById('pushBtn').addEventListener('click', () => {
        const val = document.getElementById('stackInput').value;
        if (val) { stack.push(val); document.getElementById('stackInput').value = ''; renderStack(); }
    });
    document.getElementById('popBtn').addEventListener('click', () => {
        if (stack.length > 0) { stack.pop(); renderStack(); }
    });
    function renderStack() {
        const cont = document.getElementById('stack-visualizer');
        cont.innerHTML = stack.map(v => `<div class="stack-node">${v}</div>`).join('');
    }

    // 2. Queue
    const queue = [];
    document.getElementById('enqueueBtn').addEventListener('click', () => {
        const val = document.getElementById('queueInput').value;
        if (val) { queue.push(val); document.getElementById('queueInput').value = ''; renderQueue(); }
    });
    document.getElementById('dequeueBtn').addEventListener('click', () => {
        if (queue.length > 0) { queue.shift(); renderQueue(); }
    });
    function renderQueue() {
        const cont = document.getElementById('queue-visualizer');
        cont.innerHTML = queue.map(v => `<div class="queue-node">${v}</div>`).join('');
    }

    // 3. Linked List
    class Node { constructor(data) { this.data = data; this.next = null; } }
    let head = null;
    document.getElementById('appendBtn').addEventListener('click', () => {
        const val = document.getElementById('llInput').value;
        if (!val) return;
        if (!head) head = new Node(val);
        else {
            let curr = head;
            while (curr.next) curr = curr.next;
            curr.next = new Node(val);
        }
        document.getElementById('llInput').value = '';
        renderLL();
    });
    document.getElementById('removeFirstBtn').addEventListener('click', () => {
        if (head) { head = head.next; renderLL(); }
    });
    function renderLL() {
        const cont = document.getElementById('ll-visualizer');
        cont.innerHTML = '';
        let curr = head;
        while (curr) {
            cont.innerHTML += `<div class="ll-node">${curr.data}</div>`;
            if (curr.next) cont.innerHTML += `<div class="ll-arrow">➔</div>`;
            curr = curr.next;
        }
    }

    // 4. Hash Table
    const HASH_SIZE = 5;
    const hashTable = Array.from({ length: HASH_SIZE }, () => []);
    document.getElementById('hashInsertBtn').addEventListener('click', () => {
        const val = document.getElementById('hashInput').value;
        if (!val) return;
        let sum = 0;
        for (let i = 0; i < val.length; i++) sum += val.charCodeAt(i);
        const index = sum % HASH_SIZE;
        hashTable[index].push(val);
        document.getElementById('hashInput').value = '';
        renderHash();
    });
    function renderHash() {
        const cont = document.getElementById('hash-visualizer');
        cont.innerHTML = '';
        hashTable.forEach((bucket, i) => {
            let html = `<div class="hash-bucket"><div class="hash-index">[${i}]</div>`;
            bucket.forEach(item => html += `<div class="hash-item">${item}</div>`);
            html += `</div>`;
            cont.innerHTML += html;
        });
    }
    renderHash(); // 초기 빈 테이블 렌더링

    // 5. Binary Search Tree (BST)
    class TreeNode { constructor(val) { this.val = parseInt(val); this.left = null; this.right = null; } }
    let bstRoot = null;
    document.getElementById('bstInsertBtn').addEventListener('click', () => {
        const val = document.getElementById('bstInput').value;
        if (!val) return;
        const insert = (node, newVal) => {
            if (!node) return new TreeNode(newVal);
            if (newVal < node.val) node.left = insert(node.left, newVal);
            else if (newVal > node.val) node.right = insert(node.right, newVal);
            return node;
        };
        bstRoot = insert(bstRoot, val);
        document.getElementById('bstInput').value = '';
        renderBST();
    });
    function renderBST() {
        const cont = document.getElementById('bst-visualizer');
        cont.innerHTML = '';
        // 트리를 누워있는 형태(왼쪽-가운데-오른쪽)로 시각화
        const traverse = (node, level) => {
            if (!node) return;
            traverse(node.right, level + 1);
            let div = document.createElement('div');
            div.className = 'bst-node';
            div.style.marginLeft = (level * 40) + 'px';
            div.innerText = node.val;
            cont.appendChild(div);
            cont.appendChild(document.createElement('br'));
            traverse(node.left, level + 1);
        };
        traverse(bstRoot, 0);
    }
};