class Stack {
  constructor() {
    this.storage = {};
    this.top = 0;
  }

  size() {
    return this.top;
  }

  push(...element) {
    for (let el of element) {
      this.top++;
      this.storage[`${this.top}`] = el;
    }
  }

  pop() {
    if (this.top === 0) {
      return;
    }
    let output = this.storage[`${this.top}`];
    delete this.storage[`${this.top}`];
    this.top--;

    return output;
  }
}
