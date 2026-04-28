import { byId, setText } from "../utils/dom.js";
import { ensureListMethods } from "../utils/listMethods.js";

export function initListController({ singlyList, doublyList, circularList }) {
  const typeSelect = byId("listTypeSelect");
  if (!typeSelect) return;

  ensureListMethods(singlyList);
  ensureListMethods(doublyList);
  ensureListMethods(circularList);

  const valueInput = byId("listInput");
  const indexInput = byId("listIndex");
  const labelMap = {
    singly: "단일 연결 리스트",
    doubly: "양방향 연결 리스트",
    circular: "원형 연결 리스트",
  };

  const getActiveList = () => {
    if (typeSelect.value === "singly") return singlyList;
    if (typeSelect.value === "doubly") return doublyList;
    return circularList;
  };

  const render = () => {
    const activeList = getActiveList();
    const values = activeList.toArray ? activeList.toArray() : [];
    const container = byId("list-visualizer");

    setText("listSize", values.length);
    setText("listTypeLabel", labelMap[typeSelect.value]);

    if (!container) return;

    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.gap = "10px 0";

    if (typeSelect.value === "circular") {
      container.innerHTML = values
        .map(
          (value, index) =>
            `<div class="list-node" style="border-radius: 50%;">${value}</div>` +
            (index < values.length - 1
              ? `<span class="list-arrow">➔</span>`
              : `<span class="list-arrow">↻</span>`),
        )
        .join("");
      return;
    }

    const arrow = typeSelect.value === "doubly" ? "⇄" : "➔";
    container.innerHTML = values
      .map(
        (value, index) =>
          `<div class="list-node">${value}</div>` +
          (index < values.length - 1 ? `<span class="list-arrow">${arrow}</span>` : ""),
      )
      .join("");
  };

  typeSelect.onchange = render;

  byId("listAddFrontBtn").onclick = () => {
    if (!valueInput.value) return;
    getActiveList().prepend(valueInput.value);
    valueInput.value = "";
    render();
  };

  byId("listAddLastBtn").onclick = () => {
    if (!valueInput.value) return;
    getActiveList().append(valueInput.value);
    valueInput.value = "";
    render();
  };

  byId("listInsertBtn").onclick = () => {
    const index = Number.parseInt(indexInput.value, 10);
    if (valueInput.value && !Number.isNaN(index)) {
      getActiveList().insertAt(index, valueInput.value);
      render();
    }
  };

  byId("listRemoveBtn").onclick = () => {
    const index = Number.parseInt(indexInput.value, 10);
    if (!Number.isNaN(index)) {
      getActiveList().removeAt(index);
      render();
    }
  };

  byId("listSearchBtn").onclick = () => {
    const index = getActiveList().toArray().indexOf(valueInput.value);
    alert(index !== -1 ? `위치: ${index}` : "없음");
  };

  byId("listReverseBtn").onclick = () => {
    getActiveList().reverse();
    render();
  };

  render();
}
