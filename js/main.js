import { Stack } from './models/Stack.js';
import { Queue } from './models/Queue.js';
import { LinkedList } from './models/LinkedList.js';
import { HashTable } from './models/HashTable.js';
import { BST } from './models/BST.js';

// 각 자료구조 인스턴스 생성
const stack = new Stack();
const queue = new Queue();
const list = new LinkedList();
const hash = new HashTable();
const bst = new BST();

window.onload = () => {
    // Stack 이벤트
    document.getElementById('pushBtn').onclick = () => {
        const input = document.getElementById('stackInput');
        if (input.value) { stack.push(input.value); input.value = ''; renderStack(); }
    };
    document.getElementById('popBtn').onclick = () => { stack.pop(); renderStack(); };

    // Queue 이벤트
    document.getElementById('enqueueBtn').onclick = () => {
        const input = document.getElementById('queueInput');
        if (input.value) { queue.enqueue(input.value); input.value = ''; renderQueue(); }
    };
    document.getElementById('dequeueBtn').onclick = () => { queue.dequeue(); renderQueue(); };

    // Linked List 이벤트
    document.getElementById('appendBtn').onclick = () => {
        const input = document.getElementById('llInput');
        if (input.value) { list.append(input.value); input.value = ''; renderLL(); }
    };
    document.getElementById('insertAtBtn').onclick = () => {
        const data = document.getElementById('llInput').value;
        const idx = parseInt(document.getElementById('llIndex').value);
        if (data && !isNaN(idx)) { list.insertAt(data, idx); renderLL(); }
    };
    document.getElementById('removeFirstBtn').onclick = () => { list.removeFirst(); renderLL(); };

    // Hash 이벤트
    document.getElementById('hashInsertBtn').onclick = () => {
        const input = document.getElementById('hashInput');
        if (input.value) { hash.put(input.value); input.value = ''; renderHash(); }
    };

    // BST 이벤트
    document.getElementById('bstInsertBtn').onclick = () => {
        const input = document.getElementById('bstInput');
        if (input.value) { bst.insert(input.value); input.value = ''; renderBST(); }
    };
};

// --- 렌더링 함수들 ---
function renderStack() {
    const cont = document.getElementById('stack-visualizer');
    cont.innerHTML = stack.toArray().map(v => `<div class="node">${v}</div>`).join('');
}

function renderQueue() {
    const cont = document.getElementById('queue-visualizer');
    cont.innerHTML = queue.toArray().map(v => `<div class="node">${v}</div>`).join('');
}

function renderLL() {
    const cont = document.getElementById('ll-visualizer');
    const nodes = list.toArray();
    cont.innerHTML = nodes.map((v, i) => 
        `<div class="node">${v}</div>${i < nodes.length - 1 ? '<span class="ll-arrow">➔</span>' : ''}`
    ).join('');
}

function renderHash() {
    const cont = document.getElementById('hash-visualizer');
    cont.innerHTML = hash.getTable().map((bucket, i) => 
        `<div class="hash-bucket"><div class="hash-index">[${i}]</div>${bucket.map(v => `<div class="node">${v}</div>`).join('')}</div>`
    ).join('');
}

function renderBST() {
    const cont = document.getElementById('bst-visualizer');
    cont.innerHTML = '';
    const draw = (node, depth) => {
        if (!node) return;
        draw(node.right, depth + 1);
        const div = document.createElement('div');
        div.className = 'node bst-node';
        div.style.marginLeft = (depth * 40) + 'px';
        div.innerText = node.val;
        cont.appendChild(div);
        cont.appendChild(document.createElement('br'));
        draw(node.left, depth + 1);
    };
    draw(bst.root, 0);
}
