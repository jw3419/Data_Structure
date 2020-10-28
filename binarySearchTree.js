class BinarySearchTreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    insert(value) {
        let newNode = new BinarySearchTreeNode(value);

        function recursion(node) {
            if (node.value < newNode.value) {
                if (node.right) {
                    recursion(node.right);
                }
                else {
                    node.right = newNode;
                }
            }
            else if (node.value > newNode.value) {
                if (node.left) {
                    recursion(node.left);
                }
                else {
                    node.left = newNode;
                }
            }
        }
        recursion(this);
    }

    contains(value) {
        let hasVal = false;

        function recursion(arr) {
            let hasCNodeArr = [];

            for (let item of arr) {
                if (item.value === value) {
                    hasVal = true;
                    return;
                }
                if (item.left) {
                    hasCNodeArr = hasCNodeArr.concat(item.left);
                }
                if (item.right) {
                    hasCNodeArr = hasCNodeArr.concat(item.right);
                }
            }
            if (hasCNodeArr.length > 0) {
                recursion(hasCNodeArr)
            }
        }
        recursion([this.left, this.right])
        return hasVal;
    }

    inorder(callback) {
        function travel(node) {
            if (node !== null) {
                travel(node.left);
                callback(node.value);
                travel(node.right);
            }
        }
        travel(this);
    }
}
