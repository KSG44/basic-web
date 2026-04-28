import { byId, setText } from "../utils/dom.js";

function getActiveLinear(type, stack, queue, deque) {
  if (type === "stack") return stack;
  if (type === "queue") return queue;
  return deque;
}

function removeFromFront(active) {
  if (typeof active.pop === "function") return active.pop();
  if (typeof active.dequeue === "function") return active.dequeue();
  return active.removeFront();
}

export function initLinearController({ stack, queue, deque }) {
  const typeSelect = byId("linearTypeSelect");
  if (!typeSelect) return;

  const input = byId("linearInput");
  const sizeLabel = byId("linearSizeLabel");
  const topLabel = byId("linearTopLabel");
  const container = byId("linear-visualizer");
  const addFrontBtn = byId("dequeAddFrontBtn");
  const removeBackBtn = byId("dequeRemoveBackBtn");

  const render = () => {
    const type = typeSelect.value;
    const active = getActiveLinear(type, stack, queue, deque);
    const values = active.toArray();

    if (type === "deque") {
      addFrontBtn.style.display = "inline-block";
      removeBackBtn.style.display = "inline-block";
    } else {
      addFrontBtn.style.display = "none";
      removeBackBtn.style.display = "none";
    }

    setText(sizeLabel, values.length);
    setText(
      topLabel,
      values.length > 0 ? (type === "stack" ? values[values.length - 1] : values[0]) : "Empty",
    );

    container.innerHTML = "";
    container.style.flexDirection = type === "stack" ? "column-reverse" : "row";

    values.forEach((value, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = "node-wrapper";
      wrapper.style.display = "flex";
      wrapper.style.flexDirection = "column";
      wrapper.style.alignItems = "center";

      if (type === "stack" && index === values.length - 1) {
        const indicator = document.createElement("div");
        indicator.className = "top-indicator";
        indicator.innerText = "↑ Top";
        wrapper.appendChild(indicator);
      }

      const node = document.createElement("div");
      node.className = "linear-node";
      node.innerText = value;
      wrapper.appendChild(node);
      container.appendChild(wrapper);
    });
  };

  typeSelect.onchange = render;

  byId("linearPushBtn").onclick = () => {
    if (!input.value) return;

    const active = getActiveLinear(typeSelect.value, stack, queue, deque);
    if (typeof active.push === "function") active.push(input.value);
    else if (typeof active.enqueue === "function") active.enqueue(input.value);
    else active.addBack(input.value);

    input.value = "";
    render();
  };

  byId("linearPopBtn").onclick = () => {
    removeFromFront(getActiveLinear(typeSelect.value, stack, queue, deque));
    render();
  };

  addFrontBtn.onclick = () => {
    if (!input.value) return;
    deque.addFront(input.value);
    input.value = "";
    render();
  };

  removeBackBtn.onclick = () => {
    deque.removeBack();
    render();
  };

  byId("linearPeekBtn").onclick = () => {
    const values = getActiveLinear(typeSelect.value, stack, queue, deque).toArray();
    alert(
      values.length > 0
        ? `Peek 결과: ${typeSelect.value === "stack" ? values[values.length - 1] : values[0]}`
        : "비어있음",
    );
  };

  byId("linearSearchBtn").onclick = () => {
    if (!input.value) return;

    const values = getActiveLinear(typeSelect.value, stack, queue, deque).toArray();
    const index = values.indexOf(input.value);
    alert(index === -1 ? "없음" : `위치: ${index}`);
  };

  byId("linearSizeBtn").onclick = () => {
    const values = getActiveLinear(typeSelect.value, stack, queue, deque).toArray();
    alert(`요소 개수: ${values.length}`);
  };

  byId("linearClearBtn").onclick = () => {
    const active = getActiveLinear(typeSelect.value, stack, queue, deque);
    while (active.toArray().length > 0) {
      removeFromFront(active);
    }
    render();
  };

  render();
}
