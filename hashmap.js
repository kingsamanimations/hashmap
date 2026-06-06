// This a function method for hashmap. I struggled with debugging this one.

export function HashMap (defaultCapacity = 16) {
    // Variables for functions
    let capacity = defaultCapacity;
    const loadFactor = 0.75;
    let buckets = new Array(defaultCapacity);

    // Attach a set method
    this.set = set;

    function currentCapacity() {
        return capacity;
    }

    function hash(key) {
    // Take  a key and produce a hash code with it. 
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
    } 

    function set(key, value) {
        // Take two arguments: the first is a key, and the second is a value that is assigned to this key.
        const hashedKey = hash(key);
        const index  = hash(key) % capacity;
        let linkList = buckets[index];

        if (linkList) {
            const keyNode = linkList.find(entry => entry.key === key);

            if (keyNode) {
                keyNode[1] = value;
            } else {
                linkList.push({key, value});
            }
        } else {
            buckets[index] = [];
            buckets[index].push({key, value});
        }
    }

    function get(key) {
        // Take one argument as a key and return the value that is assigned to this key. If a key is not found, return null
        const hashedKey = hash(key);
        const index  = hash(key) % capacity;

        let linkList = buckets[index];

        if (!linkList) {
            return null;
        }

        const keyNode = linkList.find( entry => entry[0]=== key);

        if (!keyNode) {
            return null;
        }

        return keyNode[1];
    }

    function has(key) {
        // Take a key as an argument and return true or false based on whether or not the key is in the hash map.
        const hashedKey = hash(key);
        const index  = hash(key) % capacity;
        let linkList = buckets[index];

        if (!linkList) {
            return false;
        }
        
        if (!linkList.contains(key)) {
            return false;
        }

        return true;
    }

    function remove(key) {
        // Take a key as an argument.
        const index = hash(key) % capacity;
        const bucket = buckets[index];

        if(!bucket) return null

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    function length() {
        // Return the number of stored keys in the hash map
        let mapLength = 0;

        buckets.forEach((linkList) => {
            if(!linkList) return;

            mapLength += linkList.length;
        });
        return mapLength;
    }

    function clear() {
        // Remove all entries
        buckets = new Array(defaultCapacity);
        capacity = defaultCapacity;
    }

    function keys() {
        // Return an array containing all the keys inside a hash map
        let entryKeys = [];

        buckets.forEach((linkList) => {
            if (!linkList) return;

            linkList.forEach((entry) => {
                entryKeys.push(entry[0]);
            });

        });

        return entryKeys;
    }

    function values() {
        // Return an array containing all the values
        let entryValues = [];

        buckets.forEach((linkList) => {
            if (!linkList) return;

            linkList.forEach((entry) => {
                entryValues.push(entry[0]);
            });

        });
        return entryValues;
    }

    function entries() {
        // Return an array that contains each key, value pair
        let allEntries = [];

        buckets.forEach((linkList) => {
            if (!bucket) return

            for (let i = 0; i < buckets.length; i++) {
                allEntries.push(buckets[i].key, buckets[i].value)
            }

        });
        return allEntries;
    }

    return {
        set,
        get,
        has,
        clear,
        remove,
        length,
        keys,
        values,
        entries,
        currentCapacity,
    };
}

const myHashMap = new HashMap();

myHashMap.set('apple', 'red');
myHashMap.set('banana', 'yellow');
myHashMap.set('carrot', 'orange');
myHashMap.set('dog', 'brown');
myHashMap.set('elephant', 'gray');
myHashMap.set('frog', 'green');
myHashMap.set('grape', 'purple');
myHashMap.set('hat', 'black');
myHashMap.set('ice cream', 'white');
myHashMap.set('jacket', 'blue');
myHashMap.set('kite', 'pink');
myHashMap.set('lion', 'golden');

console.log(myHashMap.length());

console.log("FINISHED");

// 3. Check your levels! Your map should have exactly 12 items.
// 12 items / 16 capacity = 0.75 (Right at the load factor limit!)
console.log("Current Length:", myHashMap.length()); // Should log 12
console.log("Current Capacity:", myHashMap.capacity); // Should log 16

// 4. Test overwriting nodes (the "Carlos" update scenario)
// This should change the values but NOT add new items or trigger growth.
myHashMap.set('apple', 'bright red');
myHashMap.set('banana', 'ripe yellow');
console.log("Length after updates:", myHashMap.length()); // Should STILL be 12
console.log("Updated Apple:", myHashMap.get('apple')); // Should log 'bright red'

// 5. The Moment of Truth: Add the 13th item ('moon')
// This pushes the load level over 0.75, which should trigger your growth logic!
myHashMap.set('moon', 'silver');

console.log("--- AFTER GROWTH ---");
console.log("New Capacity:", myHashMap.capacity); // Should successfully log 32!
console.log("New Length:", myHashMap.length()); // Should log 13
console.log("Can still find old data? (grape):", myHashMap.get('grape')); // Should log 'purple'

// 6. Test the remaining methods to make sure nothing broke during rehashing
console.log("Has 'dog'?:", myHashMap.has('dog')); // Should log true
console.log("Has 'cat'?:", myHashMap.has('cat')); // Should log false

console.log("Removing 'hat'...", myHashMap.remove('hat')); // Should log true
console.log("Has 'hat' now?:", myHashMap.has('hat')); // Should log false
console.log("Length after removal:", myHashMap.length()); // Should log 12

console.log("All current keys:", myHashMap.keys());
console.log("All current values:", myHashMap.values());
console.log("All entries:", myHashMap.entries());
