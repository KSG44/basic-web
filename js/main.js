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
    const cont = document.getElementById('cll-visualizer');
    if (!cont) return;

    cont.innerHTML = '';
    cont.classList.add('circular-visualizer');

    const nodes = cl.toArray();
    if (nodes.length === 0) return;

    const radius = 150; 
    const centerX = cont.clientWidth / 2;
    const centerY = cont.clientHeight / 2;
    const totalNodes = nodes.length;
    const nodeSize = 25; // 노드 상자의 대략적인 절반 크기 (테두리 보정용)

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";

    // 화살표 정의 (refX를 10으로 조정하여 선 끝에 딱 붙게 함)
    svg.innerHTML = `
        <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
            refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#1a73e8" />
            </marker>
        </defs>
    `;
    cont.appendChild(svg);

    const positions = [];

    // 1. 노드 배치 및 좌표 저장
    nodes.forEach((data, i) => {
        const angle = (i / totalNodes) * 2 * Math.PI - (Math.PI / 2);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        positions.push({ x, y, angle });

        const div = document.createElement('div');
        div.className = 'node circular-node';
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;
        div.innerText = data;

        // Head/Tail 라벨 (기존 로직 유지)
        if (i === 0) {
            const lbl = document.createElement('div');
            lbl.className = 'node-label head';
            lbl.innerText = 'Head';
            div.appendChild(lbl);
        }
        if (i === totalNodes - 1 && totalNodes > 1) {
            const lbl = document.createElement('div');
            lbl.className = 'node-label tail';
            lbl.innerText = 'Tail';
            div.appendChild(lbl);
        }

        cont.appendChild(div);
    });

    // 2. 선과 화살표 그리기 (테두리 보정 로직 추가)
    positions.forEach((pos, i) => {
        const nextPos = positions[(i + 1) % totalNodes];
        
        // 화살표가 노드 중심이 아닌 테두리에 닿도록 오프셋 계산
        // 현재 노드에서 다음 노드로 향하는 각도를 구함
        const dx = nextPos.x - pos.x;
        const dy = nextPos.y - pos.y;
        const angle = Math.atan2(dy, dx);

        // 시작점과 끝점을 노드 중심에서 약간 바깥으로 밀어냄
        const startX = pos.x + Math.cos(angle) * nodeSize;
        const startY = pos.y + Math.sin(angle) * nodeSize;
        const endX = nextPos.x - Math.cos(angle) * nodeSize;
        const endY = nextPos.y - Math.sin(angle) * nodeSize;

        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", startX);
        line.setAttribute("y1", startY);
        line.setAttribute("x2", endX);
        line.setAttribute("y2", endY);
        line.setAttribute("stroke", "#1a73e8");
        line.setAttribute("stroke-width", "2");
        line.setAttribute("marker-end", "url(#arrowhead)");
        
        svg.appendChild(line);
    });
}
function renderHash() { document.getElementById('hash-visualizer').innerHTML = ht.getTable().map((b, i) => `<div class="hash-bucket"><div class="hash-index">[${i}]</div>${b.map(v => `<div class="node">${v}</div>`).join('')}</div>`).join(''); }
function renderBST() {
    const c = document.getElementById('bst-visualizer'); c.innerHTML = '';
    const d = (n, l) => { if (!n) return; d(n.right, l + 1); const v = document.createElement('div'); v.className = 'node bst-node'; v.style.marginLeft = (l * 50) + 'px'; v.innerText = n.val; c.appendChild(v); c.appendChild(document.createElement('br')); d(n.left, l + 1); };
    d(tr.root, 0);
}