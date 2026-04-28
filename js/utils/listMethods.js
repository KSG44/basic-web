export function ensureListMethods(list) {
  if (!list.clear) {
    list.clear = function () {
      if ("head" in this) this.head = null;
      if ("tail" in this) this.tail = null;
      if ("size" in this) this.size = 0;
    };
  }

  if (!list.append) {
    list.append = function (value) {
      if (typeof this.addLast === "function") return this.addLast(value);
      if (typeof this.addBack === "function") return this.addBack(value);
      if (typeof this.enqueue === "function") return this.enqueue(value);
      if (typeof this.push === "function") return this.push(value);
      return undefined;
    };
  }

  if (!list.insertAt) {
    list.insertAt = function (index, value) {
      const values = this.toArray();
      values.splice(index, 0, value);
      this.clear();
      values.forEach((item) => this.append(item));
    };
  }

  if (!list.removeAt) {
    list.removeAt = function (index) {
      const values = this.toArray();
      values.splice(index, 1);
      this.clear();
      values.forEach((item) => this.append(item));
    };
  }

  if (!list.reverse) {
    list.reverse = function () {
      const values = this.toArray().reverse();
      this.clear();
      values.forEach((item) => this.append(item));
    };
  }

  if (!list.prepend) {
    list.prepend = function (value) {
      if (typeof this.insertAt === "function") {
        this.insertAt(0, value);
        return;
      }

      const values = this.toArray();
      values.unshift(value);
      this.clear();
      values.forEach((item) => this.append(item));
    };
  }
}
