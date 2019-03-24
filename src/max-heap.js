const Node = require('./node');

class MaxHeap {
  constructor() {
    this.root = null;
    this.parentNodes = [];
    this.heapSize = 0;
  }

  push(data, priority) {
    var node = new Node(data, priority);
    this.insertNode(node);
    this.shiftNodeUp(node);
  }

  pop() {
    if (this.isEmpty()) {
      return;
    }

    var detachedRoot = this.detachRoot();
    this.restoreRootFromLastInsertedNode(detachedRoot);
    this.shiftNodeDown(this.root);
    return detachedRoot.data;
  }

  detachRoot() {
    var detachedRoot = this.root;
    this.root = null;
    if (this.parentNodes.indexOf(detachedRoot) != -1) {
      this.parentNodes.shift();
    }
    this.heapSize--;
    return detachedRoot;
  }

  restoreRootFromLastInsertedNode(detached) {}

  size() {
    return this.heapSize;
  }

  isEmpty() {
    var result = this.root == null ? true : false;
    return result;
  }

  clear() {
    this.root = null;
    this.parentNodes = [];
    this.heapSize = 0;
  }

  insertNode(node) {
    if (this.isEmpty()) {
      this.root = node;
    } else {
      this.parentNodes[0].appendChild(node);
    }
    this.parentNodes.push(node);
    if (this.parentNodes[0].right != null) {
      this.parentNodes.shift();
    }
    this.heapSize++;
  }

  shiftNodeUp(node) {}

  shiftNodeDown(node) {}
}

module.exports = MaxHeap;
