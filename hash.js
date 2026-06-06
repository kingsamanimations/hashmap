class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class hashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.size = 0;
        this.capacity = 16;
        this.buckets = new Array(this.capacity).fill(null);
    }

    hash(key) {
        let hash = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hash = (primeNumber * hash + key.charCodeAt(i)) % this.capacity;
        }
        return hash;
    }

    set(key, value) {
        const index = this.hash(key);
        let currentNode = this.buckets[index];

        if (currentNode === null) {
            this.buckets[index] = new Node(key, value);
            this.size++;
            return;
        }

        while (currentNode !== null) {
            if (currentNode === key) {
                currentNode.value = value;
                return;
            }

            if (currentNode.next === null) {
                currentNode.next = new Node(key, value);
                this.size++;
                return;
            }
            currentNode = currentNode.next;
        }
    }

    get(key) {
        const index = this.hash(key);
        let currentNode = this.buckets[index];

        while (currentNode !== null) {
            if (currentNode.key === key) {
                return currentNode.value;
            }
            currentNode = currentNode.next;
        }
        return undefined;
    }

    has(key) {
        const index = this.hash(key);
        let currentNode = this.buckets[index];

        while (currentNode !== null) {
            if (currentNode.key === key) {
                return currentNode.value;
            }
            currentNode = currentNode.next;
        }
        return undefined;
    }

    remove(key) {
        const index = this.hash(key);
        let currentNode = this.buckets[index];
        let prevNode = null;

        while (currentNode !== null) {
            if (currentNode.key === key) {
                if (prevNode === null) {
                    this.buckets[index] = currentNode.next;
                } else {
                    prevNode.next = currentNode.next;
                }
                this.size--;
                return true;
            }
            prevNode = currentNode;
            currentNode = currentNode.next;
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(null);
        this.size =  0;
    }

    keys() {
        const keys = [];
        for (let i = 0; i < this.buckets.length; i++) {
            let currentNode = this.buckets[i];
            while (currentNode !== null) {
                keys.push(currentNode.key);
                currentNode = currentNode.next;
            }
        }
        return keys;
    }

    values() {
        const values = [];
        for (let i = 0; i < this.buckets.length; i++) {
            let currentNode = this.buckets[i];
            while (currentNode !== null) {
                values.push(currentNode.value);
                currentNode = currentNode.next;
            }
        }
        return values;
    }

    entries() {
        const entries = [];
        for (let i = 0; i < this.buckets.length; i++) {
            let currentNode = this.buckets[i];
            while (currentNode !== null) {
                entries.push([currentNode.key, currentNode.value]);
                currentNode = currentNode.next;
            }
        }
        return entries;
    }
}

const test = new hashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

// 3. Check your levels! Your map should have exactly 12 items.
// 12 items / 16 capacity = 0.75 (Right at the load factor limit!)
console.log("Current Length:", test.length()); // Should log 12
console.log("Current Capacity:", test.capacity); // Should log 16

// 4. Test overwriting nodes (the "Carlos" update scenario)
// This should change the values but NOT add new items or trigger growth.
test.set('apple', 'bright red');
test.set('banana', 'ripe yellow');
console.log("Length after updates:", test.length()); // Should STILL be 12
console.log("Updated Apple:", test.get('apple')); // Should log 'bright red'

// 5. The Moment of Truth: Add the 13th item ('moon')
// This pushes the load level over 0.75, which should trigger your growth logic!
test.set('moon', 'silver');

console.log("--- AFTER GROWTH ---");
console.log("New Capacity:", test.capacity); // Should successfully log 32!
console.log("New Length:", test.length()); // Should log 13
console.log("Can still find old data? (grape):", test.get('grape')); // Should log 'purple'

// 6. Test the remaining methods to make sure nothing broke during rehashing
console.log("Has 'dog'?:", test.has('dog')); // Should log true
console.log("Has 'cat'?:", test.has('cat')); // Should log false

console.log("Removing 'hat'...", test.remove('hat')); // Should log true
console.log("Has 'hat' now?:", test.has('hat')); // Should log false
console.log("Length after removal:", test.length()); // Should log 12

console.log("All current keys:", test.keys());
console.log("All current values:", test.values());
console.log("All entries:", test.entries());