class Queue {
  constructor() {
    this.storage = {};
    this.front = 0;
    this.rear = 0;
  }

  size() {
    return this.rear - this.front;
  }

  enqueue(...element) {
    for (let el of element) {
      this.storage[`${this.rear}`] = element;
      this.rear++;
    }
  }

  dequeue() {
    if (this.front >= this.rear) {
      return;
    }
    else {
      let output = this.storage[`${this.front}`];
      delete this.storage[`${this.front}`];
      this.front++;

      return output;
    }
  }
}