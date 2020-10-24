class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }

    addToTail(value) {
        let node = new Node(value);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        }
        else {
            this.tail.next = node;
            this.tail = node;
        }
    }

    remove(value) {
        let currNodeIdx = this.indexOf(value);
        let currNode = this.getNodeAt(currNodeIdx);
        let prevNodeIdx = currNodeIdx - 1;
        let prevNode = this.getNodeAt(prevNodeIdx);

        if (currNode === this.head) {
            this.head = currNode.next;
        }
        else {
            prevNode.next = currNode.next;
        }
        currNode.next = null;
        this.tail = this.getNodeAt(this.size() - 1);
    }

    getNodeAt(index) {
        let tmp = this.head;
        for (let i = 0; i < index; i++) {
            if (tmp === null) {
                return undefined;
            }
            tmp = tmp.next;
        }
        return tmp;
    }

    contains(value) {
        if (this.indexOf(value) === -1) {
            return false;
        }
        else {
            return true;
        }
    }

    indexOf(value) {
        let tmp = this.head;
        let count = 0;
        while (tmp !== null) {
            if (tmp.value === value) {
                return count;
            }
            count++;
            tmp = tmp.next;
        }
        return -1;
    }

    size() {
        let tmp = this.head;
        let length = 0;
        while (tmp !== null) {
            length++;
            tmp = tmp.next;
        }
        return length;
    }
}
