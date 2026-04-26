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
import { AVLTree } from "./models/AVLTree.js";
import { Graph } from "./models/Graph.js";

const s = new Stack(),
  q = new Queue(),
  dq = new Deque();
const sl = new LinkedList(),
  dl = new DoublyLinkedList(),
  cl = new CircularLinkedList(),
  al = new ArrayList();
const tr = new BST(),
  avl = new AVLTree(),
  hp = new MaxHeap();
const ht = new HashTable();
const g = new Graph();
const nodePositions = {};

window.onload = () => {
  // --- Sequential ---
  if (document.getElementById("pushBtn")) {
    document.getElementById("pushBtn").onclick = () => {
      const i = document.getElementById("stackInput");
      if (i.value) {
        s.push(i.value);
        i.value = "";
        renderStack();
      }
    };
    document.getElementById("popBtn").onclick = () => {
      s.pop();
      renderStack();
    };
    document.getElementById("enqueueBtn").onclick = () => {
      const i = document.getElementById("queueInput");
      if (i.value) {
        q.enqueue(i.value);
        i.value = "";
        renderQueue();
      }
    };
    document.getElementById("dequeueBtn").onclick = () => {
      q.dequeue();
      renderQueue();
    };
  }

  // --- List ---
  if (document.getElementById("appendBtn")) {
    document.getElementById("appendBtn").onclick = () => {
      const i = document.getElementById("llInput");
      if (i.value) {
        sl.append(i.value);
        i.value = "";
        renderLL();
      }
    };
    document.getElementById("alAddBtn").onclick = () => {
      const i = document.getElementById("alInput");
      if (i.value) {
        al.add(i.value);
        i.value = "";
        renderAL();
      }
    };
  }

  // --- Tree & Heap ---
  if (document.getElementById("bstInsertBtn")) {
    document.getElementById("bstInsertBtn").onclick = () => {
      const i = document.getElementById("bstInput");
      if (i.value) {
        tr.insert(i.value);
        i.value = "";
        updateBST();
      }
    };
    document.getElementById("bstDeleteBtn").onclick = () => {
      const i = document.getElementById("bstInput");
      if (i.value) {
        tr.delete(i.value);
        i.value = "";
        updateBST();
      }
    };
    document.getElementById("avlInsertBtn").onclick = () => {
      const i = document.getElementById("avlInput");
      if (i.value) {
        avl.insert(i.value);
        i.value = "";
        renderTree(avl.root, "avl-visualizer", "avl");
      }
    };
    document.getElementById("heapInsertBtn").onclick = () => {
      const i = document.getElementById("heapInput");
      if (i.value) {
        hp.insert(i.value);
        i.value = "";
        updateHeap();
      }
    };
    document.getElementById("heapExtractBtn").onclick = () => {
      const max = hp.extractMax();
      if (max !== null) alert("추출된 최댓값: " + max);
      updateHeap();
    };
  }

  // --- Graph ---
  if (document.getElementById("addNodeBtn")) {
    document.getElementById("addNodeBtn").onclick = () => {
      const i = document.getElementById("nodeInput");
      if (i.value) {
        g.addVertex(i.value);
        const cont = document.getElementById("graph-visualizer");
        nodePositions[i.value] = {
          x: Math.random() * (cont.clientWidth - 80) + 40,
          y: Math.random() * (cont.clientHeight - 80) + 40,
        };
        i.value = "";
        renderGraph();
      }
    };
    document.getElementById("addEdgeBtn").onclick = () => {
      const f = document.getElementById("fromNode").value,
        t = document.getElementById("toNode").value;
      if (f && t) {
        g.addEdge(f, t);
        renderGraph();
      }
    };
  }
};

// --- [도우미 함수] ---
function updateBST() {
  renderTree(tr.root, "bst-visualizer", "bst");
  const inorder = [];
  const traverse = (n) => {
    if (!n) return;
    traverse(n.left);
    inorder.push(n.val);
    traverse(n.right);
  };
  traverse(tr.root);
  const res = document.getElementById("bst-inorder-result");
  if (res) res.innerText = "중위 순회(정렬 결과): " + inorder.join(" → ");
}

function updateHeap() {
  renderTree(hp.toTree(), "heap-visualizer", "heap");
  const arrayVis = document.getElementById("heap-array-visualizer");
  if (arrayVis)
    arrayVis.innerHTML = hp.heap
      .map(
        (v, i) =>
          `<div class="array-cell"><div class="index-label">${i}</div><div class="node">${v}</div></div>`,
      )
      .join("");
}

// --- [공통 렌더링] ---
function renderStack() {
  document.getElementById("stack-visualizer").innerHTML = s
    .toArray()
    .map((v) => `<div class="node">${v}</div>`)
    .join("");
}
function renderQueue() {
  document.getElementById("queue-visualizer").innerHTML = q
    .toArray()
    .map((v) => `<div class="node">${v}</div>`)
    .join("");
}
function renderLL() {
  const a = sl.toArray();
  document.getElementById("ll-visualizer").innerHTML = a
    .map(
      (v, i) =>
        `<div class="node">${v}</div>${i < a.length - 1 ? '<span class="ll-arrow">➔</span>' : ""}`,
    )
    .join("");
}
function renderAL() {
  const cont = document.getElementById("al-visualizer");
  if (cont)
    cont.innerHTML = al
      .toArray()
      .map(
        (v, i) =>
          `<div class="array-cell"><div class="index-label">${i}</div><div class="node">${v}</div></div>`,
      )
      .join("");
}

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
    if (prefix === "avl") {
      const bf = avl.getBalance(node);
      div.innerHTML = `${node.val}<span style="font-size:10px; color:#d93025; position:absolute; top:-18px;">BF:${bf}</span>`;
    } else {
      div.innerText = node.val;
    }
    const uId = node.idx !== undefined ? node.idx : node.val;
    div.id = `${prefix}-node-${uId}`;
    wrapper.appendChild(div);
    if (node.left || node.right) {
      const childrenCont = document.createElement("div");
      childrenCont.className = "tree-children";
      childrenCont.appendChild(
        createNodeDOM(node.left) || document.createElement("div"),
      );
      childrenCont.appendChild(
        createNodeDOM(node.right) || document.createElement("div"),
      );
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
      svg.setAttribute("width", cont.scrollWidth);
      svg.setAttribute("height", cont.scrollHeight);
      cont.appendChild(svg);
      const draw = (n) => {
        if (!n) return;
        const uId = n.idx !== undefined ? n.idx : n.val;
        const pEl = document.getElementById(`${prefix}-node-${uId}`);
        const cRect = cont.getBoundingClientRect(),
          pRect = pEl.getBoundingClientRect();
        const pX = pRect.left + pRect.width / 2 - cRect.left + cont.scrollLeft,
          pY = pRect.bottom - cRect.top + cont.scrollTop;
        [n.left, n.right].forEach((child) => {
          if (child) {
            const cUId = child.idx !== undefined ? child.idx : child.val;
            const cEl = document.getElementById(`${prefix}-node-${cUId}`),
              chRect = cEl.getBoundingClientRect();
            const cX =
                chRect.left + chRect.width / 2 - cRect.left + cont.scrollLeft,
              cY = chRect.top - cRect.top + cont.scrollTop;
            const line = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "line",
            );
            line.setAttribute("x1", pX);
            line.setAttribute("y1", pY);
            line.setAttribute("x2", cX);
            line.setAttribute("y2", cY);
            line.setAttribute("stroke", "#9c27b0");
            line.setAttribute("stroke-width", "2");
            svg.appendChild(line);
            draw(child);
          }
        });
      };
      draw(root);
    });
  }
}

function renderGraph() {
  const cont = document.getElementById("graph-visualizer");
  if (!cont) return;
  cont.innerHTML = "";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "tree-svg-layer");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  cont.appendChild(svg);
  g.getEdges().forEach(([v1, v2]) => {
    const p1 = nodePositions[v1],
      p2 = nodePositions[v2];
    if (p1 && p2) {
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line",
      );
      line.setAttribute("x1", p1.x);
      line.setAttribute("y1", p1.y);
      line.setAttribute("x2", p2.x);
      line.setAttribute("y2", p2.y);
      line.setAttribute("stroke", "#1a73e8");
      line.setAttribute("stroke-width", "2");
      svg.appendChild(line);
    }
  });
  g.getVertices().forEach((v) => {
    const div = document.createElement("div");
    div.className = "node graph-node";
    div.style.left = `${nodePositions[v].x}px`;
    div.style.top = `${nodePositions[v].y}px`;
    div.style.transform = "translate(-50%, -50%)";
    div.innerText = v;
    cont.appendChild(div);
  });
}
