"use strict";

import BaseNode from "./BaseNode";

export class Node extends BaseNode {
  constructor(val) {
    super(val);
  }
}

export default class BinarySearchTree {
  constructor() {
    this.root = null;
    this.updateNodes = new Set();
  }

  find(x) {
    this.updateNodes = new Set();

    if (!this.root) {
      return false;
    }

    let node = this.root;
    while (node.val !== x) {
      this.updateNodes.add(node);
      if (x < node.val) {
        if (!node.left) {
          break;
        }

        node = node.left;
      } else {
        if (!node.right) {
          break;
        }

        node = node.right;
      }
    }

    return node.val === x;
  }

  insert(x) {
    this.updateNodes = new Set();

    const newNode = new Node(x);
    let prev = null;

    if (!this.root) {
      this.root = newNode;
      return newNode;
    }

    let curr = this.root;
    while (curr) {
      if (curr.val === x) {
        return null;
      }

      prev = curr;
      this.updateNodes.add(curr);

      if (x < curr.val) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }

    if (prev) {
      if (x < prev.val) {
        prev.setLeft(newNode);
      } else {
        prev.setRight(newNode);
      }
    } else {
      this.root = newNode;
    }

    return newNode;
  }

  remove(x) {
    this.updateNodes = new Set();

    let curr = this.root;
    while (curr) {
      if (curr.val === x) {
        break;
      }

      this.updateNodes.add(curr);

      if (x < curr.val) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }

    if (!curr) {
      return null;
    }

    const prt = curr.prt;

    if (!curr.left || !curr.right) {
      const next = curr.left || curr.right;

      if (prt) {
        if (x < prt.val) {
          prt.setLeft(next);
        } else {
          prt.setRight(next);
        }
      } else {
        // Current node is the root node
        curr.removeChild(next);
        this.root = next;
      }
    } else if (curr.left && curr.right) {
      let next = curr.right;

      while (next.left) {
        this.updateNodes.add(next);
        next = next.left;
      }

      this.updateNodes.add(next);
      const nextPrt = next.prt;

      if (!curr.isRight(next)) {
        nextPrt.setLeft(next.right);
        next.setRight(curr.right);
      }

      if (prt) {
        if (x < prt.val) {
          prt.setLeft(next);
        } else {
          prt.setRight(next);
        }
      } else {
        curr.removeRight();
        this.root = next;
      }

      next.setLeft(curr.left);
    }
    return curr;
  }

  getUpdateNodes() {
    return Array.from(this.updateNodes.values());
  }
}
