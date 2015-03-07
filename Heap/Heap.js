// Insert:                            O(logN) || O(1)
// Pop:                               O(logN)
// Peek:                              O(1)
// Build from another array:          O(N)
// Heap.sort (in placed, not stable): O(NlogN)

function Node(key, value) {
  this.key = key;
  this.value = value;

  this.toString = function () {
    return '(' + this.key + ', ' + this.value + ')';
  }
}

function swap(array, size, i, j) {
  if(i >= 0 && j >= 0 && i < size && j < size && i != j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function leftChild(i, size) {
  if(i < 0) return -1;
  var l = i * 2 + 1;
  return l >= size ? -1 : l;
}

function rightChild(i, size) {
  if(i < 0) return -1;
  var r = i * 2 + 2;
  return r >= size ? -1 : r;
}

function parent(i, size) {
  if(i >= size || i <= 0) return -1;
  return Math.floor((i - 1) / 2);
}

function bubbleDown(array, size, i) {
  if(i >= 0 && i < size) {
    var j = i;

    var l = leftChild(i, size);
    if(l >= 0 && array[l].key > array[j].key) {
      j = l;
    }

    var r = rightChild(i, size);
    if(r >= 0 && array[r].key > array[j].key) {
      j = r;
    }

    if(j != i) {
      swap(array, size, i, j);
      bubbleDown(array, size, j);
    }
  }
}

function bubbleUp(array, size, i) {
  var p = parent(i, size);
  if(p >= 0 && array[p].key < array[i].key) {
    swap(array, size, p, i);
    bubbleUp(array, size, p);
  }
}

function Heap() {
  var array = [];
  var size = 0;

  this.clear = function () {
    size = 0;
    array = [];
  }

  this.isEmpty = function () {
    return size === 0;
  }

  this.getSize = function () {
    return size;
  }

  this.insert = function (key, value) {
    array[size] = new Node(key, value);
    size++;
    bubbleUp(array, size, size - 1);
  }

  this.pop = function () {
    if(this.isEmpty()) return null;

    var max = array[0];

    swap(array, size, 0, size - 1);
    size--;
    bubbleDown(array, size, 0);

    return max;
  }

  this.peek = function () {
    if(this.isEmpty()) return null;

    return array[0];
  }

  this.build = function (seedArray) {
    array = seedArray;
    size = seedArray.length;

    for(var k = parent(size - 1); k >= 0; k--) {
      bubbleDown(array, size, k);
    }
  }

  this.toString = function () {
    var strs = [];
    array.forEach(function (n) {
      strs.push(n.toString());
    });

    return strs.join(', ');
  }
}

Heap.Node = Node;
Heap.sort = function (initialArray) {
  var heap = new Heap();
  heap.build(initialArray);
  (function heapSort(heap, count) {
    if(count > 0) {
      swap(initialArray, count, 0, count - 1);
      bubbleDown(initialArray, count - 1, 0);

      heapSort(heap, count - 1);
    }
  }(heap, initialArray.length));

  initialArray.reverse();

  return initialArray;
};

module.exports = Heap;
