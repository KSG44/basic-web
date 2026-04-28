import { byId, setText } from "../utils/dom.js";

export function initArrayController(arrayList) {
  const addLastBtn = byId("arrAddLastBtn");
  if (!addLastBtn) return;

  const input = byId("arrInput");
  const indexInput = byId("arrIndex");

  const render = () => {
    const container = byId("array-visualizer");
    if (!container) return;

    container.innerHTML = arrayList
      .toArray()
      .map((value, index) => {
        const hasValue = value !== undefined;
        return `<div class="array-cell" style="margin-right: 2px;">
                <div class="index-label" style="color: #64748b; text-align: center; margin-bottom: 5px;">${index}</div>
                <div class="node" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; font-weight: bold; border-radius: 4px; border: 2px solid ${
                  hasValue ? "#3b82f6" : "#cbd5e1"
                }; background-color: ${hasValue ? "#eff6ff" : "#f8fafc"}; color: ${
                  hasValue ? "#1e3a8a" : "transparent"
                };">${hasValue ? value : ""}</div>
            </div>`;
      })
      .join("");

    setText("arrSize", arrayList.size);
    setText("arrCapacity", arrayList.capacity);
  };

  addLastBtn.onclick = () => {
    if (!input.value) return;
    arrayList.add(input.value);
    input.value = "";
    render();
  };

  byId("arrInsertBtn").onclick = () => {
    const index = Number.parseInt(indexInput.value, 10);
    if (input.value && !Number.isNaN(index)) {
      arrayList.insertAt(index, input.value);
      render();
    }
  };

  byId("arrRemoveLastBtn").onclick = () => {
    arrayList.removeLast();
    render();
  };

  byId("arrGetBtn").onclick = () => {
    const index = Number.parseInt(indexInput.value, 10);
    if (!Number.isNaN(index)) alert(`인덱스 ${index}: ${arrayList.get(index)}`);
  };

  byId("arrSearchBtn").onclick = () => {
    if (input.value) {
      const index = arrayList.indexOf(input.value);
      alert(index === -1 ? "없음" : `위치: ${index}`);
    }
  };

  byId("arrSortBtn").onclick = () => {
    arrayList.sort();
    render();
  };

  byId("arrReverseBtn").onclick = () => {
    arrayList.reverse();
    render();
  };

  byId("arrClearBtn").onclick = () => {
    arrayList.clear();
    render();
  };

  render();
}
