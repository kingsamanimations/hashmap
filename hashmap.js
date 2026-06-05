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
        let linkList = buckets[hashedKey];

        if (key === "hat") {
            console.log("hat", hashedKey);
        }

        if (linkList) {
            const keyNode = linkList.find(key);

            if (keyNode) {
                keyNode.value = value;
            } else {
                linkList.append(key, value);
            }
        } else {
            buckets[hashedKey] = [];
            buckets[hashedKey].push({key, value});
        }
    }

    function get(key) {
        // Take one argument as a key and return the value that is assigned to this key. If a key is not found, return null
        const hashedKey = hash(key);
        if (key === "hat") {
            console.log("hat", hashedKey);
        }

        const linkList = buckets[hashedKey];

        if (!linkList) {
            return null;
        }

        const keyNode = linkList.find(key);

        if (!keyNode) {
            return null;
        }

        return keyNode.value;
    }

    function has(key) {
        // Take a key as an argument and return true or false based on whether or not the key is in the hash map.
        const hashedKey = hash(key);
        const linkList = buckets[hashedKey];

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
            if(!buckets) return null;

            mapLength += buckets.length;
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
            let head = linkList.head;

            if (head) {
                let currNode = head;

                while (currNode) {
                    entryKeys.push(currNode.key);

                    currNode = currNode.nextNode;
                }
            }

        });

        return entryKeys;
    }

    function values() {
        // Return an array containing all the values
        let entryValues = [];

        buckets.forEach((linkList) => {
            let head = linkList.head;

            if (head) {
                let currNode = head;

                while (currNode) {
                    entryValues.push(currNode.value);

                    currNode = currNode.nextNode;
                }
            }

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
