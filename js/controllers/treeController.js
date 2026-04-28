import { byId, setText } from "../utils/dom.js";

export function initTreeController(tree) {
  const insertBtn = byId("treeInsertBtn");
  if (!insertBtn) return;

  const input = byId("treeInput");
  const resultDiv = byId("tree-result");

  const renderTree = () => {
    const container = byId("tree-visualizer");
    if (!container) return;

    container.innerHTML = "";
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.alignItems = "flex-start";

    const createNodeDOM = (node) => {
      if (!node) return null;

      const wrapper = document.createElement("div");
      wrapper.className = "tree-wrapper";

      const nodeElement = document.createElement("div");
      nodeElement.className = "bst-node";
      nodeElement.innerText = node.val;
      const nodeId = node.idx !== undefined ? node.idx : node.val;
      nodeElement.id = `bst-node-${nodeId}`;
      wrapper.appendChild(nodeElement);

      if (node.left || node.right) {
        const childrenContainer = document.createElement("div");
        childrenContainer.className = "tree-children";
        childrenContainer.appendChild(
          createNodeDOM(node.left) || document.createElement("div"),
        );
        childrenContainer.appendChild(
          createNodeDOM(node.right) || document.createElement("div"),
        );
        wrapper.appendChild(childrenContainer);
      }

      return wrapper;
    };

    if (!tree.root) return;

    container.appendChild(createNodeDOM(tree.root));
    requestAnimationFrame(() => {
      const oldLayer = container.querySelector(".tree-svg-layer");
      if (oldLayer) oldLayer.remove();

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "tree-svg-layer");
      svg.setAttribute("width", container.scrollWidth);
      svg.setAttribute("height", container.scrollHeight);
      container.appendChild(svg);

      const drawEdges = (node) => {
        if (!node) return;

        const nodeId = node.idx !== undefined ? node.idx : node.val;
        const nodeElement = document.getElementById(`bst-node-${nodeId}`);
        if (!nodeElement) return;

        const containerRect = container.getBoundingClientRect();
        const nodeRect = nodeElement.getBoundingClientRect();
        const parentX = nodeRect.left + nodeRect.width / 2 - containerRect.left + container.scrollLeft;
        const parentY = nodeRect.bottom - containerRect.top + container.scrollTop;

        [node.left, node.right].forEach((child) => {
          if (!child) return;

          const childId = child.idx !== undefined ? child.idx : child.val;
          const childElement = document.getElementById(`bst-node-${childId}`);
          if (!childElement) return;

          const childRect = childElement.getBoundingClientRect();
          const childX = childRect.left + childRect.width / 2 - containerRect.left + container.scrollLeft;
          const childY = childRect.top - containerRect.top + container.scrollTop;

          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("x1", parentX);
          line.setAttribute("y1", parentY);
          line.setAttribute("x2", childX);
          line.setAttribute("y2", childY);
          line.setAttribute("stroke", "#10b981");
          line.setAttribute("stroke-width", "3");
          svg.appendChild(line);
          drawEdges(child);
        });
      };

      drawEdges(tree.root);
    });
  };

  const updateTreeUI = () => {
    renderTree();
  };

  insertBtn.onclick = () => {
    if (!input.value) return;
    tree.insert(input.value);
    input.value = "";
    updateTreeUI();
  };

  byId("treeDeleteBtn").onclick = () => {
    if (!input.value) return;
    tree.delete(input.value);
    input.value = "";
    updateTreeUI();
  };

  byId("treeSearchBtn").onclick = () => {
    if (!input.value) return;

    const target = Number.parseInt(input.value, 10);
    const path = tree.searchPath(target);

    if (!path || path.length === 0) {
      setText(resultDiv, "검색 실패: 트리가 비어있습니다.");
    } else if (path[path.length - 1].val === target) {
      const pathText = path.map((node) => node.val).join(" → ");
      setText(
        resultDiv,
        `검색 성공: [${target}] 발견! (탐색 경로: ${pathText} | 비교 횟수: ${path.length}회)`,
      );
    } else {
      const pathText = path.map((node) => node.val).join(" → ");
      setText(
        resultDiv,
        `검색 실패: 트리에 [${target}]이(가) 없습니다. (탐색 경로: ${pathText})`,
      );
    }

    input.value = "";
  };

  byId("treeInorderBtn").onclick = () => {
    setText(resultDiv, `중위 순회: ${tree.inorder(tree.root).join(" → ")}`);
  };

  byId("treePreorderBtn").onclick = () => {
    setText(resultDiv, `전위 순회: ${tree.preorder(tree.root).join(" → ")}`);
  };

  byId("treePostorderBtn").onclick = () => {
    setText(resultDiv, `후위 순회: ${tree.postorder(tree.root).join(" → ")}`);
  };

  byId("treeClearBtn").onclick = () => {
    tree.root = null;
    setText(resultDiv, "");
    updateTreeUI();
  };

  updateTreeUI();
}
