import { ArrayList } from "./models/ArrayList.js";
import { Stack } from "./models/Stack.js";
import { Queue } from "./models/Queue.js";
import { Deque } from "./models/Deque.js";
import { LinkedList } from "./models/LinkedList.js";
import { DoublyLinkedList } from "./models/DoublyLinkedList.js";
import { CircularLinkedList } from "./models/CircularLinkedList.js";
import { BST } from "./models/BST.js";

import { ensureListMethods } from "./utils/listMethods.js";
import { initArrayController } from "./controllers/arrayController.js";
import { initListController } from "./controllers/listController.js";
import { initTreeController } from "./controllers/treeController.js";
import { initLinearController } from "./controllers/linearController.js";

const state = {
  arrayList: new ArrayList(),
  stack: new Stack(),
  queue: new Queue(),
  deque: new Deque(),
  singlyList: new LinkedList(),
  doublyList: new DoublyLinkedList(),
  circularList: new CircularLinkedList(),
  tree: new BST(),
};

ensureListMethods(state.singlyList);
ensureListMethods(state.doublyList);
ensureListMethods(state.circularList);

document.addEventListener("DOMContentLoaded", () => {
  initArrayController(state.arrayList);
  initListController({
    singlyList: state.singlyList,
    doublyList: state.doublyList,
    circularList: state.circularList,
  });
  initTreeController(state.tree);
  initLinearController({
    stack: state.stack,
    queue: state.queue,
    deque: state.deque,
  });
});
