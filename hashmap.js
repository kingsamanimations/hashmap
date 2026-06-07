// This a function method for hashmap. I struggled with debugging this one.

export function HashMap (defaultCapacity = 16) {
    console.log("created");
    console.log("constructor ran");
    // Variables for functions
    const loadFactor = 0.75;

    // Attach a set method
    this.set = set;

    let capacity = defaultCapacity;

    function getCapacity() {
        console.log("Capacity Called");
        return capacity;
    };

    function currentCapacity() {
        return capacity;
    }

    let buckets = new Array(capacity);

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
                keyNode.value = value;
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
        const index  = hash(key) % capacity;

        let linkList = buckets[index];

        if (!linkList) {
            return null;
        }

        const keyNode = linkList.find( entry => entry.key === key);

        if (!keyNode) {
            return null;
        }

        return keyNode.value;
    }

    function has(key) {
        // Take a key as an argument and return true or false based on whether or not the key is in the hash map.
        const index  = hash(key) % capacity;
        let linkList = buckets[index];

        if (!linkList) {
            return false;
        }
        
        return linkList.some(entry => entry.key === key);
    }

    function remove(key) {
        // Take a key as an argument.
        const index = hash(key) % capacity;
        const linkList = buckets[index];

        if(!linkList){
            return false;
        }

        const enterIndex = linkList.findIndex(entry => entry.key === key);

        if (enterIndex === 1) {
            return false;
        }

        linkList.splice(enterIndex, 1);
        return true;
        
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
                entryKeys.push(entry.key);
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
                entryValues.push(entry.key);
            });

        });
        return entryValues;
    }

    function entries() {
        // Return an array that contains each key, value pair
        let allEntries = [];

        buckets.forEach((linkList) => {
            if (!linkList) return;

            linkList.forEach((entry) => {
                allEntries.push(entry);
            })

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
        getCapacity,
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

console.log("Current Length:", myHashMap.length()); // Should log 12
console.log("Current Capacity:", myHashMap.currentCapacity()); // Should log 16


myHashMap.set('apple', 'bright red');
myHashMap.set('banana', 'ripe yellow');
console.log("Length after updates:", myHashMap.length()); // Should STILL be 12
console.log("Updated Apple:", myHashMap.get('apple')); // Should log 'bright red'

myHashMap.set('moon', 'silver');

console.log("--- AFTER GROWTH ---");
console.log("New Capacity:", myHashMap.getCapacity()); // Should successfully log 32!
console.log("instance created");
console.log("New Length:", myHashMap.length()); // Should log 13
console.log("Can still find old data? (grape):", myHashMap.get('grape')); // Should log 'purple'


console.log("Has 'dog'?:", myHashMap.has('dog')); // Should log true
console.log("Has 'cat'?:", myHashMap.has('cat')); // Should log false

console.log("Removing 'hat'...", myHashMap.remove('hat')); // Should log true
console.log("Has 'hat' now?:", myHashMap.has('hat')); // Should log false
console.log("Length after removal:", myHashMap.length()); // Should log 12

console.log("All current keys:", myHashMap.keys());
console.log("All current values:", myHashMap.values());
console.log("All entries:", myHashMap.entries());
