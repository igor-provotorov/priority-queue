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

  restoreRootFromLastInsertedNode(detached) {
    if (!(detached instanceof Node)) {
      return;
    }

    var lastNode = this.parentNodes.pop();
    var parentNode;

    if (lastNode != undefined) {
      this.root = lastNode;
      parentNode = lastNode.parent;

      if (parentNode != null) {
        lastNode.remove();

        if (
          parentNode.left != null &&
          parentNode.right == null &&
          parentNode != detached
        ) {
          this.parentNodes.unshift(parentNode);
        }
      }

      if (detached.left != null) {
        lastNode.appendChild(detached.left);
      }
      if (detached.right != null) {
        lastNode.appendChild(detached.right);
        return;
      }

      this.parentNodes.unshift(lastNode);
    }
  }

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
