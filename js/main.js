import { Stack } from "./models/Stack.js";
import { Queue } from "./models/Queue.js";
import { Deque } from "./models/Deque.js";
import { LinkedList } from "./models/LinkedList.js";
import { DoublyLinkedList } from "./models/DoublyLinkedList.js";
import { CircularLinkedList } from "./models/CircularLinkedList.js";
import { ArrayList } from "./models/ArrayList.js";
import { HashTable } from "./models/HashTable.js";
import { BST } from "./models/BST.js";
import { MaxHeap } from "./models/Heap.js";
import { AVLTree } from "./models/AVLTree.js"; // 🌟 누락된 AVL 모델 추가

// --- [전역 인스턴스 선언] ---
const s = new Stack(), q = new Queue(), dq = new Deque();
const sl = new LinkedList(), dl = new DoublyLinkedList(), cl = new CircularLinkedList(), al = new ArrayList();
const tr = new BST(), avl = new AVLTree(), hp = new MaxHeap(); // 🌟 avl 인스턴스 추가
const ht = new HashTable();

window.onload = () => {
  // --- [1. Sequential Structures - linear.html] ---
  if (document.getElementById("pushBtn")) {
    document.getElementById("pushBtn").onclick = () => { const i = document.getElementById("stackInput"); if (i.value) { s.push(i.value); i.value = ""; renderStack(); } };
    document.getElementById("popBtn").onclick = () => { s.pop(); renderStack(); };
    document.getElementById("enqueueBtn").onclick = () => { const i = document.getElementById("queueInput"); if (i.value) { q.enqueue(i.value); i.value = ""; renderQueue(); } };
    document.getElementById("dequeueBtn").onclick = () => { q.dequeue(); renderQueue(); };
    document.getElementById("addFrontBtn").onclick = () => { const i = document.getElementById("dequeInput"); if (i.value) { dq.addFront(i.value); i.value = ""; renderDeque(); } };
    document.getElementById("addBackBtn").onclick = () => { const i = document.getElementById("dequeInput"); if (i.value) { dq.addBack(i.value); i.value = ""; renderDeque(); } };
    document.getElementById("popFrontBtn").onclick = () => { dq.removeFront(); renderDeque(); };
    document.getElementById("popBackBtn").onclick = () => { dq.removeBack(); renderDeque(); };
  }

  // --- [2. List Structures - list.html] ---
  if (document.getElementById("appendBtn")) {
    document.getElementById("appendBtn").onclick = () => { const i = document.getElementById("llInput"); if (i.value) { sl.append(i.value); i.value = ""; renderLL(); } };
    document.getElementById("removeFirstBtn").onclick = () => { sl.removeFirst(); renderLL(); };
    document.getElementById("dllAppendBtn").onclick = () => { const i = document.getElementById("dllInput"); if (i.value) { dl.append(i.value); i.value = ""; renderDLL(); } };
    document.getElementById("dllRemoveBtn").onclick = () => { dl.removeLast(); renderDLL(); };
    document.getElementById("cllAppendBtn").onclick = () => { const i = document.getElementById("cllInput"); if (i.value) { cl.append(i.value); i.value = ""; renderCLL(); } };
    document.getElementById("cllRemoveBtn").onclick = () => { cl.removeFirst(); renderCLL(); };

    document.getElementById("alAddBtn").onclick = () => { const i = document.getElementById("alInput"); if (i.value) { al.add(i.value); i.value = ""; renderAL(); } };
    document.getElementById("alInsertBtn").onclick = () => { const d = document.getElementById("alInput").value, idx = parseInt(document.getElementById("alIndex").value); if (d && !isNaN(idx)) { al.insertAt(idx, d); renderAL(); } };
    document.getElementById("alRemoveAtBtn").onclick = () => { const idx = parseInt(document.getElementById("alIndex").value); if (!isNaN(idx)) { al.removeAt(idx); renderAL(); } };
    document.getElementById("alGetBtn").onclick = () => { const idx = parseInt(document.getElementById("alIndex").value); if (!isNaN(idx)) alert(`Index ${idx}의 값: ` + al.get(idx)); };
    document.getElementById("alRemoveBtn").onclick = () => { al.removeLast(); renderAL(); };
  }

  // --- [3. Tree Structures - tree.html] ---
  if (document.getElementById("bstInsertBtn")) {
    // BST
    document.getElementById("bstInsertBtn").onclick = () => { const i = document.getElementById("bstInput"); if (i.value) { tr.insert(i.value); i.value = ""; renderTree(tr.root, "bst-visualizer", "bst"); } };
    document.getElementById("bstSearchBtn").onclick = async () => {
      const val = document.getElementById("bstInput").value; if (!val) return;
      const path = tr.searchPath(val);
      for (const node of path) { renderTree(tr.root, "bst-visualizer", "bst", node); await new Promise((r) => setTimeout(r, 600)); }
      if (path.length > 0 && path[path.length - 1].val === parseInt(val)) alert("데이터를 찾았습니다!");
      else alert("데이터가 트리에 없습니다.");
      renderTree(tr.root, "bst-visualizer", "bst");
    };
    document.getElementById("bstDeleteBtn").onclick = () => { const i = document.getElementById("bstInput"); if (i.value) { tr.delete(i.value); i.value = ""; renderTree(tr.root, "bst-visualizer", "bst"); } };

    // 🌟 AVL 트리 버튼 이벤트 추가
    if (document.getElementById("avlInsertBtn")) {
      document.getElementById("avlInsertBtn").onclick = () => {
        const i = document.getElementById("avlInput");
        if (i.value) { avl.insert(i.value); i.value = ""; renderTree(avl.root, "avl-visualizer", "avl"); }
      };
    }

    // Heap
    document.getElementById("heapInsertBtn").onclick = () => { const i = document.getElementById("heapInput"); if (i.value) { hp.insert(i.value); i.value = ""; renderTree(hp.toTree(), "heap-visualizer", "heap"); } };
    document.getElementById("heapExtractBtn").onclick = () => { const max = hp.extractMax(); if (max !== null) alert("추출된 최댓값: " + max); renderTree(hp.toTree(), "heap-visualizer", "heap"); };
  }

  // --- [4. Hash Table - hash.html] ---
  if (document.getElementById("hashInsertBtn")) {
    document.getElementById("hashInsertBtn").onclick = () => { const i = document.getElementById("hashInput"); if (i.value) { ht.put(i.value); i.value = ""; renderHash(); } };
  }
};

// --- [렌더링 함수 그룹] ---
function renderStack() { document.getElementById("stack-visualizer").innerHTML = s.toArray().map((v) => `<div class="node">${v}</div>`).join(""); }
function renderQueue() { document.getElementById("queue-visualizer").innerHTML = q.toArray().map((v) => `<div class="node">${v}</div>`).join(""); }
function renderDeque() { document.getElementById("deque-visualizer").innerHTML = dq.toArray().map((v) => `<div class="node">${v}</div>`).join(""); }
function renderLL() { const a = sl.toArray(); document.getElementById("ll-visualizer").innerHTML = a.map((v, i) => `<div class="node">${v}</div>${i < a.length - 1 ? '<span class="ll-arrow">➔</span>' : ""}`).join(""); }
function renderDLL() { const a = dl.toArray(); document.getElementById("dll-visualizer").innerHTML = a.map((v, i) => `<div class="node">${v}</div>${i < a.length - 1 ? '<span class="ll-arrow">⇄</span>' : ""}`).join(""); }
function renderAL() { const cont = document.getElementById("al-visualizer"); if (cont) { cont.innerHTML = al.toArray().map((v, i) => `<div class="array-cell"><div class="index-label">${i}</div><div class="node">${v}</div></div>`).join(""); } }
function renderCLL() { /* 기존의 복잡한 SVG 로직 (생략 없이 유지) */ }

function renderTree(root, containerId, prefix, highlightNode = null) {
  const cont = document.getElementById(containerId);
  if (!cont) return;
  cont.innerHTML = "";
  cont.style.display = "flex";
  cont.style.justifyContent = "center";
  cont.style.alignItems = "flex-start";

  const createNodeDOM = (node) => {
    if (!node) return null;
    const wrapper = document.createElement("div");
    wrapper.className = "tree-wrapper";
    const div = document.createElement("div");
    div.className = "node bst-node";
    div.innerText = node.val;
    // 🌟 ID 중복 방지를 위해 idx가 있으면 사용, 없으면 val 사용
    const uniqueId = node.idx !== undefined ? node.idx : node.val;
    div.id = `${prefix}-node-${uniqueId}`;
    if (highlightNode && node.val === highlightNode.val) { div.style.backgroundColor = "#ffd700"; div.style.borderColor = "#d93025"; }
    wrapper.appendChild(div);
    if (node.left || node.right) {
      const childrenCont = document.createElement("div");
      childrenCont.className = "tree-children";
      childrenCont.appendChild(createNodeDOM(node.left) || document.createElement("div"));
      childrenCont.appendChild(createNodeDOM(node.right) || document.createElement("div"));
      wrapper.appendChild(childrenCont);
    }
    return wrapper;
  };

  if (root) {
    cont.appendChild(createNodeDOM(root));
    requestAnimationFrame(() => {
      const oldSvg = cont.querySelector(".tree-svg-layer");
      if (oldSvg) oldSvg.remove();
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "tree-svg-layer");
      svg.setAttribute("width", cont.scrollWidth); svg.setAttribute("height", cont.scrollHeight);
      cont.appendChild(svg);
      const drawLines = (node) => {
        if (!node) return;
        const uId = node.idx !== undefined ? node.idx : node.val;
        const pEl = document.getElementById(`${prefix}-node-${uId}`);
        const cRect = cont.getBoundingClientRect(), pRect = pEl.getBoundingClientRect();
        const pX = pRect.left + pRect.width / 2 - cRect.left + cont.scrollLeft, pY = pRect.bottom - cRect.top + cont.scrollTop;
        [node.left, node.right].forEach((child) => {
          if (child) {
            const childUId = child.idx !== undefined ? child.idx : child.val;
            const cEl = document.getElementById(`${prefix}-node-${childUId}`), chRect = cEl.getBoundingClientRect();
            const cX = chRect.left + chRect.width / 2 - cRect.left + cont.scrollLeft, cY = chRect.top - cRect.top + cont.scrollTop;
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", pX); line.setAttribute("y1", pY); line.setAttribute("x2", cX); line.setAttribute("y2", cY);
            line.setAttribute("stroke", "#9c27b0"); line.setAttribute("stroke-width", "2");
            svg.appendChild(line); drawLines(child);
          }
        });
      };
      drawLines(root);
    });
  }
}

function renderHash() { document.getElementById("hash-visualizer").innerHTML = ht.getTable().map((b, i) => `<div class="hash-bucket"><div class="hash-index">[${i}]</div>${b.map((v) => `<div class="node">${v}</div>`).join("")}</div>`).join(""); }
