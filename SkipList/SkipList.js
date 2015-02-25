function SkipList() {
    function Node(key, value, level) {
        this.key = key;
        this.value = value;
        this.level = level;
        this.next = [];
    }

    var p = 0.5;
    var MAX_LEVEL = 32;
    var level = 1;
    var head = new Node('head', 'head');

    var randomLevel = function() {
        var level = 1;

        while (Math.random() < p && level < MAX_LEVEL)
            level += 1;

        return level;
    };

    this.search = function(searchKey) {
        var x = head;
        // Loop invariant: x.key < searchKey.
        for (var l = level; l >= 1; l--) {
            while (x.next[l] && x.next[l].key < searchKey) {
                x = x.next[l];
            }
            // Loop post-invariant: x.key < searchKey <= x.next[l].key
            // We can check the node has been found here!
            // if(x.next[l].key === searchKey)
        }
        // x.key < searchKey <= x.next[1].key

        x = x.next[1];
        if (x && x.key === searchKey) {
            return x;
        } else {
            return null;
        }
    };

    this.insert = function(searchKey, value) {
        var update = [];
        var x = head;

        // Loop invariant: x.key < searchKey.
        for (var l = level; l >= 1; l--) {
            while (x.next[l] && x.next[l].key < searchKey) {
                x = x.next[l];
            }
            // Loop post-invariant: x.key < searchKey <= x.next[l].key
            update[l] = x;
        }
        // x.key < searchKey <= x.next[1].key

        x = x.next[1];
        if (x && x.key === searchKey) {
            x.value = value;
            return x;
        } else {
            var nodeLevel = randomLevel();

            if (nodeLevel > level) {
                for (var i = level + 1; i <= nodeLevel; i++) {
                    update[i] = head;
                }

                level = nodeLevel;
            }

            var newNode = new Node(searchKey, value, nodeLevel);
            for (var i = 1; i <= nodeLevel; i++) {
                newNode.next[i] = update[i].next[i];
                update[i].next[i] = newNode;
            }

            return newNode;
        }
    };

    this.delete = function(searchKey) {
        var update = [];
        var x = head;

        // Loop invariant: x.key < searchKey.
        for (var l = level; l >= 1; l--) {
            while (x.next[l] && x.next[l].key < searchKey) {
                x = x.next[l];
            }
            // Loop post-invariant: x.key < searchKey <= x.next[l].key
            update[l] = x;
        }
        // x.key < searchKey <= x.next[1].key

        x = x.next[1];
        if (x && x.key === searchKey) {
            for (var i = 1; i <= x.level; i++) {
                update[i].next[i] = x.next[i];
            }

            while (level > 1 && !head.next[level]) {
                level -= 1;
            }

            return x;
        }

        return null;
    };

    this.print = function() {
        debugger;
        var x = head;
        var str = '';
        while (x.next[1]) {
            str += '(' + x.next[1].key + ', ' + x.next[1].value + ', ' + x.next[1].level + ')';
            x = x.next[1];
        }
        return str;
    };
}