import { Stack } from './models/Stack.js';
import { Queue } from './models/Queue.js';
import { Deque } from './models/Deque.js';
import { LinkedList } from './models/LinkedList.js';
import { DoublyLinkedList } from './models/DoublyLinkedList.js';
import { CircularLinkedList } from './models/CircularLinkedList.js';
import { HashTable } from './models/HashTable.js';
import { BST } from './models/BST.js';

const s = new Stack(), q = new Queue(), dq = new Deque(), sl = new LinkedList();
const dl = new DoublyLinkedList(), cl = new CircularLinkedList(), ht = new HashTable(), tr = new BST();

window.onload = () => {
    // Sequential (linear.html)
    const pushBtn = document.getElementById('pushBtn');
    if (pushBtn) {
        pushBtn.onclick = () => { const i = document.getElementById('stackInput'); s.push(i.value); i.value = ''; renderStack(); };
        document.getElementById('popBtn').onclick = () => { s.pop(); renderStack(); };
        document.getElementById('enqueueBtn').onclick = () => { const i = document.getElementById('queueInput'); q.enqueue(i.value); i.value = ''; renderQueue(); };
        document.getElementById('dequeueBtn').onclick = () => { q.dequeue(); renderQueue(); };
        document.getElementById('addFrontBtn').onclick = () => { const i = document.getElementById('dequeInput'); dq.addFront(i.value); i.value = ''; renderDeque(); };
        document.getElementById('addBackBtn').onclick = () => { const i = document.getElementById('dequeInput'); dq.addBack(i.value); i.value = ''; renderDeque(); };
        document.getElementById('popFrontBtn').onclick = () => { dq.removeFront(); renderDeque(); };
        document.getElementById('popBackBtn').onclick = () => { dq.removeBack(); renderDeque(); };
    }

    // List (list.html)
    const appendBtn = document.getElementById('appendBtn');
    if (appendBtn) {
        appendBtn.onclick = () => { const i = document.getElementById('llInput'); sl.append(i.value); i.value = ''; renderLL(); };
        document.getElementById('removeFirstBtn').onclick = () => { sl.removeFirst(); renderLL(); };
        
        document.getElementById('dllAppendBtn').onclick = () => { const i = document.getElementById('dllInput'); dl.append(i.value); i.value = ''; renderDLL(); };
        document.getElementById('dllRemoveBtn').onclick = () => { dl.removeLast(); renderDLL(); };
        
        document.getElementById('cllAppendBtn').onclick = () => { const i = document.getElementById('cllInput'); cl.append(i.value); i.value = ''; renderCLL(); };
        document.getElementById('cllRemoveBtn').onclick = () => { cl.removeFirst(); renderCLL(); };
    }

    // Hash & Tree (hash.html, tree.html)
    const hashBtn = document.getElementById('hashInsertBtn');
    if (hashBtn) { hashBtn.onclick = () => { const i = document.getElementById('hashInput'); ht.put(i.value); i.value = ''; renderHash(); }; }
    
    const bstBtn = document.getElementById('bstInsertBtn');
    if (bstBtn) { bstBtn.onclick = () => { const i = document.getElementById('bstInput'); tr.insert(i.value); i.value = ''; renderBST(); }; }
};

// 렌더링 함수들
function renderStack() { document.getElementById('stack-visualizer').innerHTML = s.toArray().map(v => `<div class="node">${v}</div>`).join(''); }
function renderQueue() { document.getElementById('queue-visualizer').innerHTML = q.toArray().map(v => `<div class="node">${v}</div>`).join(''); }
function renderDeque() { document.getElementById('deque-visualizer').innerHTML = dq.toArray().map(v => `<div class="node">${v}</div>`).join(''); }
function renderLL() { document.getElementById('ll-visualizer').innerHTML = sl.toArray().map((v, i, a) => `<div class="node">${v}</div>${i < a.length-1 ? '<span class="ll-arrow">➔</span>' : ''}`).join(''); }
function renderDLL() { document.getElementById('dll-visualizer').innerHTML = dl.toArray().map((v, i, a) => `<div class="node">${v}</div>${i < a.length-1 ? '<span class="ll-arrow">⇄</span>' : ''}`).join(''); }
function renderCLL() { 
    const a = cl.toArray();
    document.getElementById('cll-visualizer').innerHTML = a.map((v) => `<div class="node">${v}</div><span class="ll-arrow">➔</span>`).join('') + (a.length > 0 ? '<span class="ll-arrow">(Head)</span>' : '');
}
function renderHash() { document.getElementById('hash-visualizer').innerHTML = ht.getTable().map((b, i) => `<div class="hash-bucket"><div class="hash-index">[${i}]</div>${b.map(v => `<div class="node">${v}</div>`).join('')}</div>`).join(''); }
function renderBST() {
    const c = document.getElementById('bst-visualizer'); c.innerHTML = '';
    const d = (n, l) => { if (!n) return; d(n.right, l + 1); const v = document.createElement('div'); v.className = 'node bst-node'; v.style.marginLeft = (l * 50) + 'px'; v.innerText = n.val; c.appendChild(v); c.appendChild(document.createElement('br')); d(n.left, l + 1); };
    d(tr.root, 0);
}