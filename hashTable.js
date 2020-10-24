const hashFunction = function (str, max) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) + hash + str.charCodeAt(i);
        hash &= hash; // Convert to 32bit integer
        hash = Math.abs(hash);
    }
    return hash % max;
};

const LimitedArray = function (limit) {
    const storage = [];

    const limitedArray = {};
    limitedArray.get = function (index) {
        checkLimit(index);
        return storage[index];
    };
    limitedArray.set = function (index, value) {
        checkLimit(index);
        storage[index] = value;
    };
    limitedArray.each = function (callback) {
        for (let i = 0; i < storage.length; i++) {
            callback(storage[i], i, storage);
        }
    };

    var checkLimit = function (index) {
        if (typeof index !== 'number') {
            throw new Error('setter requires a numeric index for its first argument');
        }
        if (limit <= index) {
            throw new Error('Error trying to access an over-the-limit index');
        }
    };

    return limitedArray;
};

class HashTable {
    constructor() {
        this._size = 0;       // size = input의 개수 , storage의 크기를 나타내는 변수가 아니다.
        this._limit = 8;
        this._storage = LimitedArray(this._limit);
    }

    insert(key, value) {
        const index = hashFunction(key, this._limit);
        let hasValue = this._storage.get(index);
        let obj = hasValue ? hasValue : {}

        obj[key] = value;
        this._storage.set(index, obj)
        this._size++;

        if (this._size > this._limit * 0.75) {
            this._resize(this._limit * 2);
        }
    }

    retrieve(key) {
        const index = hashFunction(key, this._limit);
        if (this._storage.get(index) && this._storage.get(index)[key]) {
            return this._storage.get(index)[key];
        }
        else {
            return undefined;
        }
    }

    remove(key) {
        const index = hashFunction(key, this._limit);
        delete this._storage.get(index)[key];

        if (this._size < this._limit * 0.25) {
            this._resize(this._limit / 2);
        }
        this._size--;
    }

    _resize(newLimit) {
        const originStorage = this._storage;

        this._limit = newLimit;
        this._storage = LimitedArray(this._limit);
        this._size = 0;

        // originStorage가 each 내부의 this로 바인딩 되지 않게 하기 위해서, 화살표 함수를 사용한다.
        originStorage.each(obj => {
            for (let key in obj) {
                this.insert(key, obj[key])
            }
        });

    }
}
