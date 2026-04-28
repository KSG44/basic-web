import { Stack } from "./models/Stack.js";
import { Queue } from "./models/Queue.js";
import { Deque } from "./models/Deque.js";
import { LinkedList } from "./models/LinkedList.js";
import { DoublyLinkedList } from "./models/DoublyLinkedList.js";
import { CircularLinkedList } from "./models/CircularLinkedList.js";
import { ArrayList } from "./models/ArrayList.js";
import { BST } from "./models/BST.js";
import { MaxHeap } from "./models/Heap.js";
import { AVLTree } from "./models/AVLTree.js";
// 그래프, 해시테이블 임포트 제거 완료

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

// 리스트 폴백 로직
const ensureListMethods = (list) => {
  if (!list.clear)
    list.clear = function () {
      this.head = null;
      this.size = 0;
    };
  if (!list.append)
    list.append = function (val) {
      this.addLast ? this.addLast(val) : this.tail ? this.addLast(val) : null;
    };
  if (!list.insertAt)
    list.insertAt = function (idx, val) {
      const arr = this.toArray();
      arr.splice(idx, 0, val);
      this.clear();
      arr.forEach((v) => this.append(v));
    };
  if (!list.removeAt)
    list.removeAt = function (idx) {
      const arr = this.toArray();
      arr.splice(idx, 1);
      this.clear();
      arr.forEach((v) => this.append(v));
    };
  if (!list.reverse)
    list.reverse = function () {
      const arr = this.toArray().reverse();
      this.clear();
      arr.forEach((v) => this.append(v));
    };
  if (!list.prepend)
    list.prepend = function (val) {
      const arr = this.toArray();
      arr.unshift(val);
      this.clear();
      arr.forEach((v) => this.append(v));
    };
};
ensureListMethods(sl);
ensureListMethods(dl);
ensureListMethods(cl);

window.onload = () => {
  // --- [1. 동적 배열 - array.html] ---
  if (document.getElementById("arrAddLastBtn")) {
    const input = document.getElementById("arrInput"),
      indexInput = document.getElementById("arrIndex");
    document.getElementById("arrAddLastBtn").onclick = () => {
      if (input.value) {
        al.add(input.value);
        input.value = "";
        renderAL();
      }
    };
    document.getElementById("arrInsertBtn").onclick = () => {
      const idx = parseInt(indexInput.value);
      if (input.value && !isNaN(idx)) {
        al.insertAt(idx, input.value);
        renderAL();
      }
    };
    document.getElementById("arrRemoveLastBtn").onclick = () => {
      al.removeLast();
      renderAL();
    };
    document.getElementById("arrGetBtn").onclick = () => {
      const idx = parseInt(indexInput.value);
      if (!isNaN(idx)) alert(`인덱스 ${idx}: ${al.get(idx)}`);
    };
    document.getElementById("arrSearchBtn").onclick = () => {
      if (input.value) alert(`위치: ${al.indexOf(input.value)}`);
    };
    document.getElementById("arrSortBtn").onclick = () => {
      al.sort();
      renderAL();
    };
    document.getElementById("arrReverseBtn").onclick = () => {
      al.reverse();
      renderAL();
    };
    document.getElementById("arrClearBtn").onclick = () => {
      al.clear();
      renderAL();
    };
    renderAL();
  }

  // --- [2. 연결 리스트 - list.html] ---
  if (document.getElementById("listTypeSelect")) {
    const typeSelect = document.getElementById("listTypeSelect"),
      valInput = document.getElementById("listInput"),
      idxInput = document.getElementById("listIndex");
    const getActiveList = () =>
      typeSelect.value === "singly"
        ? sl
        : typeSelect.value === "doubly"
          ? dl
          : cl;

    const updateListUI = () => {
      const type = typeSelect.value;
      const arr = getActiveList().toArray ? getActiveList().toArray() : [];
      document.getElementById("listSize").innerText = arr.length;

      const cont = document.getElementById("list-visualizer");
      if (!cont) return;
      cont.style.display = "flex";
      cont.style.flexWrap = "wrap";
      cont.style.gap = "10px 0";

      // 🌟 텍스트 대신 예쁜 블록(.list-node)으로 렌더링 🌟
      if (type === "circular") {
        cont.innerHTML = arr
          .map(
            (v, i) =>
              `<div class="list-node" style="border-radius: 50%;">${v}</div>` +
              (i < arr.length - 1
                ? `<span class="list-arrow">➔</span>`
                : `<span class="list-arrow">↻</span>`),
          )
          .join("");
      } else {
        const arrow = type === "doubly" ? "⇄" : "➔";
        cont.innerHTML = arr
          .map(
            (v, i) =>
              `<div class="list-node">${v}</div>` +
              (i < arr.length - 1
                ? `<span class="list-arrow">${arrow}</span>`
                : ""),
          )
          .join("");
      }
    };

    typeSelect.onchange = updateListUI;
    document.getElementById("listAddFrontBtn").onclick = () => {
      if (valInput.value) {
        getActiveList().prepend(valInput.value);
        valInput.value = "";
        updateListUI();
      }
    };
    document.getElementById("listAddLastBtn").onclick = () => {
      if (valInput.value) {
        getActiveList().append(valInput.value);
        valInput.value = "";
        updateListUI();
      }
    };
    document.getElementById("listInsertBtn").onclick = () => {
      const idx = parseInt(idxInput.value);
      if (valInput.value && !isNaN(idx)) {
        getActiveList().insertAt(idx, valInput.value);
        updateListUI();
      }
    };
    document.getElementById("listRemoveBtn").onclick = () => {
      const idx = parseInt(idxInput.value);
      if (!isNaN(idx)) {
        getActiveList().removeAt(idx);
        updateListUI();
      }
    };
    document.getElementById("listSearchBtn").onclick = () => {
      const idx = getActiveList().toArray().indexOf(valInput.value);
      alert(idx !== -1 ? `위치: ${idx}` : "없음");
    };
    document.getElementById("listReverseBtn").onclick = () => {
      getActiveList().reverse();
      updateListUI();
    };
    updateListUI();
  }

  // --- [3. 트리 구조 - tree.html] ---
  if (document.getElementById("treeTypeSelect")) {
    const treeType = document.getElementById("treeTypeSelect"),
      input = document.getElementById("treeInput");

    document.getElementById("treeInsertBtn").onclick = () => {
      if (!input.value) return;
      const val = parseInt(input.value);
      if (treeType.value === "bst") tr.insert(val);
      else if (treeType.value === "avl") avl.insert(val);
      else hp.insert(val);
      input.value = "";
      updateTreeUI();
    };
    document.getElementById("treeDeleteBtn").onclick = () => {
      if (!input.value) return;
      if (treeType.value === "bst") tr.delete(parseInt(input.value));
      input.value = "";
      updateTreeUI();
    };
    document.getElementById("treeClearBtn").onclick = () => {
      if (treeType.value === "bst") tr.root = null;
      else if (treeType.value === "avl") avl.root = null;
      else hp.heap = [];
      updateTreeUI();
    };
    treeType.onchange = updateTreeUI;
    updateTreeUI();
  }

  // --- [4. 스택/큐/데크 - linear.html] ---
  if (document.getElementById("linearTypeSelect")) {
    const typeSelect = document.getElementById("linearTypeSelect"),
      input = document.getElementById("linearInput");
    const getActiveLinear = () =>
      typeSelect.value === "stack" ? s : typeSelect.value === "queue" ? q : dq;

    const updateLinearUI = () => {
      const type = typeSelect.value;
      const arr = getActiveLinear().toArray();
      const cont = document.getElementById("linear-visualizer");

      document.getElementById("linearSizeLabel").innerText = arr.length;
      document.getElementById("linearTopLabel").innerText =
        arr.length > 0
          ? type === "stack"
            ? arr[arr.length - 1]
            : arr[0]
          : "Empty";

      cont.innerHTML = "";
      cont.style.flexDirection = type === "stack" ? "column-reverse" : "row"; // 스택은 세로, 큐는 가로

      arr.forEach((v, i) => {
        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.flexDirection = "column";
        wrapper.style.alignItems = "center";
        if (type === "stack" && i === arr.length - 1) {
          const ind = document.createElement("div");
          ind.className = "top-indicator";
          ind.innerText = "↑ Top";
          wrapper.appendChild(ind);
        }
        const node = document.createElement("div");
        node.className = "linear-node";
        node.innerText = v;
        wrapper.appendChild(node);
        cont.appendChild(wrapper);
      });
    };

    typeSelect.onchange = updateLinearUI;
    document.getElementById("linearPushBtn").onclick = () => {
      if (input.value) {
        getActiveLinear().push
          ? getActiveLinear().push(input.value)
          : getActiveLinear().enqueue
            ? getActiveLinear().enqueue(input.value)
            : getActiveLinear().addBack(input.value);
        input.value = "";
        updateLinearUI();
      }
    };
    document.getElementById("linearPopBtn").onclick = () => {
      getActiveLinear().pop
        ? getActiveLinear().pop()
        : getActiveLinear().dequeue
          ? getActiveLinear().dequeue()
          : getActiveLinear().removeFront();
      updateLinearUI();
    };
    document.getElementById("linearSizeBtn").onclick = () =>
      alert(`크기: ${getActiveLinear().toArray().length}`);
    document.getElementById("linearSearchBtn").onclick = () => {
      const idx = getActiveLinear().toArray().indexOf(input.value);
      alert(idx !== -1 ? `위치: ${idx}` : "없음");
    };
    document.getElementById("linearClearBtn").onclick = () => {
      while (getActiveLinear().toArray().length > 0) {
        getActiveLinear().pop
          ? getActiveLinear().pop()
          : getActiveLinear().dequeue
            ? getActiveLinear().dequeue()
            : getActiveLinear().removeFront();
      }
      updateLinearUI();
    };
    document.getElementById("linearPeekBtn").onclick = () => {
      const type = typeSelect.value;
      const arr = getActiveLinear().toArray();
      if (arr.length === 0) {
        alert("현재 자료구조가 비어있습니다.");
      } else {
        // 스택은 맨 위(마지막), 큐와 데크는 맨 앞(처음) 값을 확인
        const peekValue = type === "stack" ? arr[arr.length - 1] : arr[0];
        alert(`Peek (확인) 결과: ${peekValue}`);
      }
    };
    updateLinearUI();
  }
};

// --- [렌더링 함수 그룹] ---
function renderAL() {
  const cont = document.getElementById("array-visualizer");
  if (!cont) return;
  cont.innerHTML = al
    .toArray()
    .map((v, i) => {
      const isVal = v !== undefined;
      return `<div class="array-cell" style="margin-right: 2px;">
                <div class="index-label" style="color: #64748b; text-align: center; margin-bottom: 5px;">${i}</div>
                <div class="node" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; font-weight: bold; border-radius: 4px; border: 2px solid ${isVal ? "#3b82f6" : "#cbd5e1"}; background-color: ${isVal ? "#eff6ff" : "#f8fafc"}; color: ${isVal ? "#1e3a8a" : "transparent"};">${isVal ? v : ""}</div>
            </div>`;
    })
    .join("");
  if (document.getElementById("arrSize"))
    document.getElementById("arrSize").innerText = al.size;
  if (document.getElementById("arrCapacity"))
    document.getElementById("arrCapacity").innerText = al.capacity;
}

function updateTreeUI() {
  const type = document.getElementById("treeTypeSelect").value;
  const arrayVis = document.getElementById("heap-array-visualizer");
  if (type === "heap") {
    if (arrayVis) {
      arrayVis.style.display = "flex";
      arrayVis.innerHTML = hp.heap
        .map(
          (v, i) =>
            `<div style="margin:5px; text-align:center;"><div>${i}</div><div style="width:40px;height:40px;background:#10b981;color:white;display:flex;align-items:center;justify-content:center;border-radius:4px;font-weight:bold;">${v}</div></div>`,
        )
        .join("");
    }
    renderTree(hp.toTree(), "tree-visualizer", "heap");
  } else {
    if (arrayVis) arrayVis.style.display = "none";
    renderTree(type === "bst" ? tr.root : avl.root, "tree-visualizer", type);
  }
}

// 🌟 트리를 화면에 그리는 핵심 로직 복구 완료 🌟
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
    div.className = "bst-node";
    div.innerText = node.val;
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
            line.setAttribute("stroke", "#10b981");
            line.setAttribute("stroke-width", "3");
            svg.appendChild(line);
            draw(child);
          }
        });
      };
      draw(root);
    });
  }
}
